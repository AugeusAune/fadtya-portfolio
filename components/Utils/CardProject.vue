<template>
  <div class="group h-full flex flex-col justify-between border border-slate-200 dark:border-gray-800 rounded-3xl shadow-xl hover:shadow-2xl bg-white dark:bg-[#0f172a] hover:border-green-500/50 transition-all duration-500 overflow-hidden w-full hover:-translate-y-2" >
    <div class="relative h-56 overflow-hidden">
      <!-- Image with overlay -->
      <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" :src="props.imageSrc" alt="Project Image" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      <!-- Badges -->
      <div v-if="props.isPrivat" class="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-xl backdrop-blur-md">
        <Icon name="ph:lock-key-fill" /> Private
      </div>
    </div>
    
    <div class="p-8 flex-1 flex flex-col">
      <h3 class="text-xl font-black text-slate-900 dark:text-white group-hover:text-green-500 transition-colors mb-3">
        {{ props.title }}
      </h3>
      <p class="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {{ props.description }}
      </p>
      
      <div class="mt-auto flex flex-wrap gap-3">
        <div v-for="(icon, index) in props.tech" :key="index" class="p-2 rounded-xl bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-lg group-hover:border-green-500/20 transition-colors">
          <Icon :name="icon" />
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
})
</script>
