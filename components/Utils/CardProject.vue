<template>
  <div
    class="group h-full flex flex-col border border-slate-200/90 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900/60 hover:border-blue-400/80 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden w-full hover:-translate-y-0.5 hover:shadow-md shadow-sm"
    :class="isPrivat ? '' : 'cursor-pointer'"
    @click="openLinkProject"
  >
    <!-- Image -->
    <div class="relative h-44 overflow-hidden bg-slate-100 dark:bg-gray-800">
      <img
        class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        :src="props.imageSrc"
        :alt="props.title"
        loading="lazy"
        decoding="async"
        width="800"
        height="450"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"
      ></div>

      <div
        v-if="props.isPrivat"
        class="absolute top-3 right-3 bg-slate-900/85 text-white border border-white/20 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
      >
        <Icon name="ph:lock-key-fill" class="text-xs text-amber-400" /> Private
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 sm:p-6 flex-1 flex flex-col gap-3">
      <h3
        class="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug"
      >
        {{ props.title }}
      </h3>
      <p
        class="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-3 flex-1"
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
          class="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 group-hover:border-blue-500/20 transition-colors"
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

  const openLinkProject = () => {
    if (props.linkProject) {
      window.open(props.linkProject, '_blank');
    }
  };
</script>
