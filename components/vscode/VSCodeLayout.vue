<template>
  <div class="h-screen w-screen overflow-hidden flex flex-col bg-[var(--vscode-bg)] text-[var(--vscode-text)] select-none">
    <!-- 1. Top Titlebar -->
    <VSCodeTitlebar />

    <!-- 2. Main Body: Activity Bar + Sidebar + Editor + Terminal -->
    <div class="flex-1 w-full flex overflow-hidden relative">
      <!-- Activity Bar -->
      <VSCodeActivityBar />

      <!-- Sidebar -->
      <VSCodeSidebar />

      <!-- Mobile Backdrop for Sidebar -->
      <div
        v-if="vscode.isSidebarOpen.value"
        class="md:hidden fixed inset-0 z-10 bg-black/40 backdrop-blur-xs"
        @click="vscode.toggleSidebar(false)"
      />

      <!-- Editor & Terminal Column -->
      <div class="flex-1 flex flex-col h-full overflow-hidden relative">
        <VSCodeEditor />
        <VSCodeTerminal />
      </div>
    </div>

    <!-- 3. Bottom Status Bar -->
    <VSCodeStatusBar />

    <!-- 4. Global Command Palette Modal -->
    <VSCodeCommandPalette />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useVSCode } from '../../composables/useVSCode';
import VSCodeTitlebar from './VSCodeTitlebar.vue';
import VSCodeActivityBar from './VSCodeActivityBar.vue';
import VSCodeSidebar from './VSCodeSidebar.vue';
import VSCodeEditor from './VSCodeEditor.vue';
import VSCodeTerminal from './VSCodeTerminal.vue';
import VSCodeStatusBar from './VSCodeStatusBar.vue';
import VSCodeCommandPalette from './VSCodeCommandPalette.vue';

const vscode = useVSCode();

const handleGlobalKeydown = (e: KeyboardEvent): void => {
  // Ctrl+P or Cmd+K: Command Palette
  if ((e.ctrlKey && e.key.toLowerCase() === 'p') || (e.metaKey && e.key.toLowerCase() === 'k')) {
    e.preventDefault();
    vscode.toggleCommandPalette();
    return;
  }

  // Ctrl+` (Tilde): Terminal Toggle
  if (e.ctrlKey && e.key === '`') {
    e.preventDefault();
    vscode.toggleTerminal();
    return;
  }

  // Ctrl+B: Sidebar Toggle
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    vscode.toggleSidebar();
    return;
  }

  // Ctrl+W or Cmd+W: Close active editor tab
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'w') {
    e.preventDefault();
    if (vscode.activeFileId.value) {
      vscode.closeTab(vscode.activeFileId.value);
    }
    return;
  }
};

onMounted(() => {
  vscode.initTheme();

  // Responsive default: close sidebar on narrow screens
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    vscode.toggleSidebar(false);
  }

  window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGlobalKeydown);
  }
});
</script>
