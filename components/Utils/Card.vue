<template>
  <div
    class="group relative flex items-center gap-3.5 sm:gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900/50 border border-slate-200/90 dark:border-gray-800 hover:border-blue-400/70 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 shadow-sm"
  >
    <div
      class="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100/90 dark:bg-gray-800 text-2xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform duration-300"
    >
      <Icon :name="props.icon" />
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ props.name }}
      </h3>
      <p class="text-xs text-slate-500 dark:text-gray-400 truncate mt-0.5">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    icon: { type: String, required: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
  });
</script>
