<template>
  <main class="flex-1 h-full bg-[var(--vscode-bg)] flex flex-col overflow-hidden relative select-text">
    <!-- Tabs Header -->
    <VSCodeTabs />

    <!-- Breadcrumb Bar -->
    <div
      v-if="activeFile"
      class="h-6 px-4 bg-[var(--vscode-bg)] border-b border-[var(--vscode-border)]/40 flex items-center gap-1.5 text-[11px] text-[var(--vscode-text-muted)] select-none shrink-0"
    >
      <span class="hover:text-[var(--vscode-text)] cursor-pointer">portfolio</span>
      <Icon name="mdi:chevron-right" class="text-xs" />
      <span class="hover:text-[var(--vscode-text)] cursor-pointer">{{ activeFile.folder }}</span>
      <Icon name="mdi:chevron-right" class="text-xs" />
      <span class="text-[var(--vscode-text)] font-semibold flex items-center gap-1">
        <Icon :name="activeFile.icon" class="text-xs" />
        {{ activeFile.name }}
      </span>
    </div>

    <!-- Empty State: No Open Files -->
    <div
      v-if="!activeFile || vscode.openTabs.value.length === 0"
      class="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4"
    >
      <div class="w-16 h-16 rounded-2xl bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)] flex items-center justify-center text-[var(--vscode-accent)]">
        <Icon name="mdi:microsoft-visual-studio-code" class="text-4xl" />
      </div>
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-[var(--vscode-text)]">No Open Editors</h3>
        <p class="text-xs text-[var(--vscode-text-muted)] max-w-sm">
          Select a file from the explorer on the left, or press Ctrl+P to search for files.
        </p>
      </div>
      <button
        @click="vscode.openFile('README.md')"
        class="px-4 py-2 rounded-lg bg-[var(--vscode-accent)] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md"
      >
        Open README.md
      </button>
    </div>

    <!-- Editor Body -->
    <div v-else class="flex-1 overflow-hidden flex flex-col">
      <!-- 1. PREVIEW MODE -->
      <div
        v-if="vscode.editorViewMode.value === 'preview'"
        class="flex-1 overflow-y-auto"
      >
        <component :is="resolvedPreviewComponent" />
      </div>

      <!-- 2. CODE MODE -->
      <div
        v-else-if="vscode.editorViewMode.value === 'code'"
        class="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm leading-relaxed"
      >
        <div class="relative rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 p-4">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[var(--vscode-border)]/50 text-xs">
            <span class="text-[var(--vscode-text-muted)] uppercase tracking-wider font-sans font-bold">
              {{ activeFile.language }} Source File
            </span>
            <button
              @click="copyCode"
              class="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--vscode-bg)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] text-[var(--vscode-text)] text-xs transition-colors"
            >
              <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" class="text-xs text-[var(--vscode-accent)]" />
              <span>{{ copied ? 'Copied!' : 'Copy Code' }}</span>
            </button>
          </div>

          <div class="flex overflow-x-auto">
            <!-- Line Numbers (Optimized single pre element) -->
            <pre class="select-none pr-4 text-right text-[var(--vscode-text-muted)] opacity-60 font-mono text-xs shrink-0 border-r border-[var(--vscode-border)]/50 mr-4 font-normal leading-relaxed">{{ lineNumbersText }}</pre>

            <!-- Code Content -->
            <pre class="flex-1 font-mono text-xs text-[var(--vscode-text)] overflow-x-auto whitespace-pre font-normal leading-relaxed">{{ activeFile.codeContent }}</pre>
          </div>
        </div>
      </div>

      <!-- 3. SPLIT MODE (Desktop Dual Pane) -->
      <div
        v-else-if="vscode.editorViewMode.value === 'split'"
        class="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--vscode-border)]"
      >
        <!-- Left: Code -->
        <div class="h-full overflow-y-auto p-4 font-mono text-xs">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-[var(--vscode-border)]/40">
            <span class="text-[var(--vscode-text-muted)] font-sans font-bold uppercase text-[10px]">Source View</span>
            <button @click="copyCode" class="text-[10px] text-[var(--vscode-accent)] hover:underline">
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <div class="flex">
            <pre class="select-none pr-3 text-right text-[var(--vscode-text-muted)] opacity-60 font-mono text-xs shrink-0 border-r border-[var(--vscode-border)]/40 mr-3 font-normal leading-relaxed">{{ lineNumbersText }}</pre>
            <pre class="flex-1 text-xs text-[var(--vscode-text)] whitespace-pre overflow-x-auto leading-relaxed">{{ activeFile.codeContent }}</pre>
          </div>
        </div>

        <!-- Right: Visual Preview -->
        <div class="h-full overflow-y-auto">
          <component :is="resolvedPreviewComponent" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue';
import { useVSCode } from '../../composables/useVSCode';
import VSCodeTabs from './VSCodeTabs.vue';
import ReadmePreview from './previews/ReadmePreview.vue';

const AboutPreview = defineAsyncComponent(() => import('./previews/AboutPreview.vue'));
const SkillsPreview = defineAsyncComponent(() => import('./previews/SkillsPreview.vue'));
const ProjectsPreview = defineAsyncComponent(() => import('./previews/ProjectsPreview.vue'));
const ExperiencePreview = defineAsyncComponent(() => import('./previews/ExperiencePreview.vue'));
const EducationPreview = defineAsyncComponent(() => import('./previews/EducationPreview.vue'));
const ContactPreview = defineAsyncComponent(() => import('./previews/ContactPreview.vue'));

const vscode = useVSCode();
const copied = ref(false);

const activeFile = computed(() => vscode.activeFile.value);

const lineNumbersText = computed((): string => {
  if (!activeFile.value?.codeContent) return '1';
  const count = activeFile.value.codeContent.split('\n').length;
  let res = '1';
  for (let i = 2; i <= count; i++) {
    res += '\n' + i;
  }
  return res;
});

const previewMap: Record<string, any> = {
  ReadmePreview,
  AboutPreview,
  SkillsPreview,
  ProjectsPreview,
  ExperiencePreview,
  EducationPreview,
  ContactPreview
};

const resolvedPreviewComponent = computed(() => {
  const componentName = activeFile.value?.previewComponent;
  if (componentName && previewMap[componentName]) {
    return previewMap[componentName];
  }
  return ReadmePreview;
});

const copyCode = async (): Promise<void> => {
  if (!activeFile.value?.codeContent) return;
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(activeFile.value.codeContent);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};
</script>
