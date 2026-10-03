<template>
  <div
    v-if="vscode.isTerminalOpen.value"
    :class="[
      'w-full bg-[var(--vscode-terminal-bg)] border-t border-[var(--vscode-border)] flex flex-col font-mono text-xs select-text shrink-0 z-20 transition-all duration-200 shadow-2xl',
      isMaximized ? 'h-96' : 'h-64'
    ]"
  >
    <!-- Dock Header -->
    <div class="h-8 bg-[var(--vscode-sidebar-bg)] border-b border-[var(--vscode-border)] px-3 flex items-center justify-between select-none">
      <!-- Tabs -->
      <div class="flex items-center gap-4 text-[11px] font-sans">
        <button
          v-for="tab in ['TERMINAL', 'OUTPUT', 'PROBLEMS']"
          :key="tab"
          @click="activeDockTab = tab"
          :class="[
            'pb-1 tracking-wider font-semibold border-b-2 transition-colors',
            activeDockTab === tab
              ? 'text-[var(--vscode-text)] border-[var(--vscode-accent)]'
              : 'text-[var(--vscode-text-muted)] border-transparent hover:text-[var(--vscode-text)]'
          ]"
        >
          {{ tab }}
          <span v-if="tab === 'PROBLEMS'" class="text-[9px] px-1 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 ml-1">0</span>
        </button>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-1.5 text-[var(--vscode-text-muted)]">
        <button
          @click="clearTerminal"
          class="p-1 rounded hover:bg-[var(--vscode-bg)] hover:text-white transition-colors"
          title="Clear Terminal (Ctrl+L)"
        >
          <Icon name="mdi:trash-can-outline" class="text-sm" />
        </button>

        <button
          @click="isMaximized = !isMaximized"
          class="p-1 rounded hover:bg-[var(--vscode-bg)] hover:text-white transition-colors"
          :title="isMaximized ? 'Restore Panel Size' : 'Maximize Panel Size'"
        >
          <Icon :name="isMaximized ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="text-base" />
        </button>

        <button
          @click="vscode.toggleTerminal(false)"
          class="p-1 rounded hover:bg-[var(--vscode-bg)] hover:text-white transition-colors"
          title="Close Terminal Dock"
        >
          <Icon name="mdi:close" class="text-sm" />
        </button>
      </div>
    </div>

    <!-- Terminal Content Area -->
    <div
      v-if="activeDockTab === 'TERMINAL'"
      ref="terminalScrollContainer"
      class="flex-1 p-3 overflow-y-auto space-y-1 font-mono text-[11px] md:text-xs leading-relaxed"
    >
      <!-- History Lines -->
      <div v-for="(entry, idx) in history" :key="idx" class="space-y-1">
        <div class="flex items-center gap-1.5 text-[var(--vscode-text-muted)]">
          <span class="text-emerald-400 font-bold">visitor@farhan-portfolio</span>
          <span>:</span>
          <span class="text-[var(--vscode-accent)]">~</span>
          <span>$</span>
          <span class="text-[var(--vscode-text)] font-semibold">{{ entry.command }}</span>
        </div>

        <pre
          v-if="entry.output"
          :class="[
            'whitespace-pre-wrap pl-2 font-mono text-[11px] leading-relaxed',
            entry.type === 'error' ? 'text-rose-400' : entry.type === 'success' ? 'text-emerald-300' : 'text-[var(--vscode-text)]'
          ]"
        >{{ entry.output }}</pre>
      </div>

      <!-- Active Prompt Input -->
      <div class="flex items-center gap-1.5 pt-1 text-[var(--vscode-text-muted)]">
        <span class="text-emerald-400 font-bold shrink-0">visitor@farhan-portfolio</span>
        <span>:</span>
        <span class="text-[var(--vscode-accent)] shrink-0">~</span>
        <span>$</span>
        <input
          ref="cliInput"
          v-model="currentInput"
          @keydown="handleKeydown"
          type="text"
          class="flex-1 bg-transparent border-none outline-none text-[var(--vscode-text)] font-mono text-[11px] md:text-xs p-0 m-0 focus:ring-0"
          placeholder="Type 'help' for commands..."
          autofocus
        />
      </div>
    </div>

    <!-- Output Tab -->
    <div v-else-if="activeDockTab === 'OUTPUT'" class="flex-1 p-4 text-[var(--vscode-text-muted)] space-y-2">
      <div class="text-emerald-400">[Nuxt 4 / Bun] Application initialized cleanly.</div>
      <div>[VFS Engine] 7 virtual files registered in memory.</div>
      <div>[Theme Manager] Active theme: {{ vscode.activeTheme.value }}.</div>
      <div>[Telemetry] Ready for developer interactions.</div>
    </div>

    <!-- Problems Tab -->
    <div v-else class="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-2 text-[var(--vscode-text-muted)]">
      <Icon name="mdi:check-circle-outline" class="text-3xl text-emerald-400" />
      <div class="text-xs font-semibold text-[var(--vscode-text)]">No problems have been detected in the workspace.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue';
import { useVSCode } from '../../composables/useVSCode';
import { executeCommand, type TerminalResult } from '../../utils/terminalCommands';

const vscode = useVSCode();

const activeDockTab = ref('TERMINAL');
const isMaximized = ref(false);
const currentInput = ref('');
const cliInput = ref<HTMLInputElement | null>(null);
const terminalScrollContainer = ref<HTMLDivElement | null>(null);

interface HistoryEntry {
  command: string;
  output: string;
  type: 'normal' | 'success' | 'error' | 'clear';
}

const history = reactive<HistoryEntry[]>([
  {
    command: 'welcome',
    output: 'Farhan Aditya Portfolio Terminal [Version 4.0.0]\nType "help" for a list of available commands or "skills" / "projects".',
    type: 'success'
  }
]);

const commandHistory = ref<string[]>([]);
const historyIndex = ref<number>(-1);

const clearTerminal = (): void => {
  history.splice(0, history.length);
};

const scrollToBottom = async (): Promise<void> => {
  await nextTick();
  if (terminalScrollContainer.value) {
    terminalScrollContainer.value.scrollTop = terminalScrollContainer.value.scrollHeight;
  }
};

const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Enter') {
    runCommand();
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    navigateHistory('up');
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    navigateHistory('down');
  }
};

const navigateHistory = (direction: 'up' | 'down'): void => {
  if (commandHistory.value.length === 0) return;

  if (direction === 'up') {
    if (historyIndex.value === -1) {
      historyIndex.value = commandHistory.value.length - 1;
    } else if (historyIndex.value > 0) {
      historyIndex.value -= 1;
    }
  } else if (direction === 'down') {
    if (historyIndex.value !== -1) {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value += 1;
      } else {
        historyIndex.value = -1;
        currentInput.value = '';
        return;
      }
    }
  }

  if (historyIndex.value !== -1) {
    currentInput.value = commandHistory.value[historyIndex.value];
  }
};

const runCommand = (): void => {
  const raw = currentInput.value;
  currentInput.value = '';
  historyIndex.value = -1;

  if (raw.trim()) {
    commandHistory.value.push(raw.trim());
  }

  const result: TerminalResult = executeCommand(raw, (action, payload) => {
    if (action === 'openFile') vscode.openFile(payload);
    if (action === 'setTheme') vscode.setTheme(payload);
  });

  if (result.type === 'clear') {
    clearTerminal();
    return;
  }

  history.push({
    command: raw,
    output: result.output,
    type: result.type
  });

  scrollToBottom();
};

watch(() => vscode.isTerminalOpen.value, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      cliInput.value?.focus();
      scrollToBottom();
    });
  }
});
</script>
