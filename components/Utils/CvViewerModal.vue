<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="props.modelValue"
        class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-950/80 backdrop-blur-md"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div
          class="relative flex flex-col w-full h-[100dvh] sm:h-[88vh] sm:max-w-5xl bg-white dark:bg-gray-900 border-0 sm:border border-slate-200 dark:border-gray-800 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden transition-all"
        >
          <!-- Header Bar -->
          <div
            class="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-gray-800 bg-slate-50/90 dark:bg-gray-900/90 shrink-0 gap-2"
          >
            <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                class="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0"
              >
                <Icon name="ph:file-pdf-duotone" class="text-lg sm:text-xl" />
              </div>
              <div class="min-w-0">
                <h3
                  id="cv-modal-title"
                  class="text-xs sm:text-base font-bold text-slate-900 dark:text-white truncate"
                >
                  Farhan Aditya · Resume
                </h3>
                <p class="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 truncate">
                  Full Stack Engineer
                </p>
              </div>
            </div>

            <!-- Action Controls -->
            <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="/cv.pdf"
                target="_blank"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors min-h-[38px]"
                title="Open in native viewer / new tab"
              >
                <Icon name="ph:arrow-square-out-bold" class="text-sm text-blue-600 dark:text-blue-400" />
                <span class="hidden xs:inline sm:inline">Open</span>
              </a>

              <a
                href="/cv.pdf"
                download
                class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm min-h-[38px]"
                title="Download CV PDF"
              >
                <Icon name="ph:download-simple-bold" class="text-sm" />
                <span>Download</span>
              </a>

              <button
                type="button"
                @click="close"
                class="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                aria-label="Close CV Viewer"
              >
                <Icon name="ph:x-bold" class="text-lg" />
              </button>
            </div>
          </div>

          <!-- Mobile Quick Action Banner -->
          <div class="sm:hidden px-4 py-2 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs text-blue-800 dark:text-blue-300">
            <span>For pinch-to-zoom on phone:</span>
            <a href="/cv.pdf" target="_blank" class="font-bold underline flex items-center gap-1">
              Open Full Screen
              <Icon name="ph:arrow-up-right-bold" class="text-xs" />
            </a>
          </div>

          <!-- Document Viewer Area -->
          <div class="flex-1 w-full h-full bg-slate-100 dark:bg-gray-950 p-1.5 sm:p-4 overflow-hidden">
            <iframe
              src="/cv.pdf#view=FitH"
              class="w-full h-full rounded-lg sm:rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white"
              title="Curriculum Vitae Farhan Aditya"
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = '';
  }
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
