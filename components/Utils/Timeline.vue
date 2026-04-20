<template>
  <div class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-gray-800 before:to-transparent">
    <div v-for="(item, index) in props.data" :key="index" class="relative">
      <div class="md:flex items-center md:space-x-4 mb-3">
        <div class="flex items-center space-x-4 md:space-x-2 md:left-0 md:w-32">
          <!-- Dot -->
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-4 border-slate-100 dark:border-gray-800 text-green-500 shadow md:order-1">
            <Icon name="ph:caret-right-bold" />
          </div>
          <!-- Time -->
          <time class="font-bold text-xs text-green-500 uppercase tracking-widest md:w-28 md:text-right">
            {{ item.time }}
          </time>
        </div>
        <!-- Title box -->
        <div class="ml-14 md:ml-0 bg-white dark:bg-gray-800/30 border border-slate-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <h4 class="font-black text-slate-900 dark:text-white group-hover:text-green-500 transition-colors">
              {{ item.title }}
            </h4>
            <span v-if="item.status" class="px-2 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-wider">
              {{ item.status }}
            </span>
          </div>
          <p class="text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-4">
            {{ item.description }}
          </p>
          <div v-if="item.icon_skil" class="flex flex-wrap gap-3">
             <Icon v-for="(icon, idx) in item.icon_skil" :key="idx" :name="icon" class="text-xl opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Array, required: true }
})
</script>
