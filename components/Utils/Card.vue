<template>
  <div
    class="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800/50 border border-slate-200 dark:border-gray-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 hover:-translate-y-1"
  >
    <div
      class="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-gray-800 text-3xl group-hover:bg-green-500 group-hover:text-white transition-colors duration-300"
    >
      <Icon :name="props.icon" />
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-black text-slate-900 dark:text-white truncate">
        {{ props.name }}
      </h3>
      <p class="text-xs text-slate-500 dark:text-gray-500 truncate">
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
