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
        class="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div
          class="relative flex flex-col w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all transform scale-100"
        >
          <!-- Header Bar -->
          <div
            class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/80 shrink-0"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0"
              >
                <Icon name="ph:file-pdf-duotone" class="text-xl" />
              </div>
              <div class="min-w-0">
                <h3
                  id="cv-modal-title"
                  class="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
                >
                  Curriculum Vitae · Farhan Aditya
                </h3>
                <p class="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 truncate">
                  Full Stack Engineer · PDF Preview
                </p>
              </div>
            </div>

            <!-- Action Controls -->
            <div class="flex items-center gap-2 shrink-0">
              <a
                href="/cv.pdf"
                download
                class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm min-h-[38px]"
                title="Download CV PDF"
              >
                <Icon name="ph:download-simple-bold" class="text-sm" />
                <span class="hidden sm:inline">Download</span>
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200/80 dark:bg-gray-800 hover:bg-slate-300/80 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors min-h-[38px]"
                title="Open in new tab"
              >
                <Icon name="ph:arrow-square-out-bold" class="text-sm" />
                <span>New Tab</span>
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

          <!-- Document Viewer Area -->
          <div class="flex-1 w-full h-full bg-slate-100 dark:bg-gray-950 p-2 sm:p-4 overflow-hidden">
            <object
              data="/cv.pdf"
              type="application/pdf"
              class="w-full h-full rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white"
            >
              <!-- Mobile browser fallback if embedded PDF preview is unsupported -->
              <div
                class="flex flex-col items-center justify-center h-full p-6 text-center bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800"
              >
                <div
                  class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4"
                >
                  <Icon name="ph:file-pdf-duotone" class="text-3xl" />
                </div>
                <h4 class="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Preview in New Tab or Download
                </h4>
                <p class="text-xs text-slate-600 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
                  Your device or browser does not embed inline PDF documents. You can view the full resume in a new tab or download it directly.
                </p>
                <div class="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <Icon name="ph:arrow-square-out-bold" /> Open Full Screen
                  </a>
                  <a
                    href="/cv.pdf"
                    download
                    class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700 font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-gray-700"
                  >
                    <Icon name="ph:download-simple-bold" /> Download PDF
                  </a>
                </div>
              </div>
            </object>
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
