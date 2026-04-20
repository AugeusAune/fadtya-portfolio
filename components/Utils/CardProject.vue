<template>
  <div
    class="group h-full flex flex-col border border-slate-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#0f172a] hover:border-green-500/40 transition-all duration-300 overflow-hidden w-full hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/5"
  >
    <!-- Image -->
    <div class="relative h-44 overflow-hidden">
      <img
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        :src="props.imageSrc"
        alt="Project Image"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"
      ></div>

      <div
        v-if="props.isPrivat"
        class="absolute top-3 right-3 bg-red-500/90 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm"
      >
        <Icon name="ph:lock-key-fill" class="text-xs" /> Private
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col gap-3">
      <h3
        class="text-sm font-black text-slate-900 dark:text-white group-hover:text-green-500 transition-colors leading-snug"
      >
        {{ props.title }}
      </h3>
      <p
        class="text-xs text-slate-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1"
      >
        {{ props.description }}
      </p>

      <!-- Tech icons -->
      <div
        class="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-gray-800"
      >
        <div
          v-for="(icon, index) in props.tech"
          :key="index"
          class="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 group-hover:border-green-500/20 transition-colors"
        >
          <Icon :name="icon" class="text-base block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: { type: String, required: true },
    imageSrc: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: Array, required: true },
    linkProject: { type: String, required: true },
    isPrivat: { type: Boolean, required: false, default: false },
  });
</script>
