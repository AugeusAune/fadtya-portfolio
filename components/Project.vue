<template>
  <div class="px-4 sm:px-6 py-16 lg:py-24" id="projects">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center text-center mb-10 sm:mb-14">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest mb-3"
        >
          Case Studies
        </div>
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight"
        >
          Featured <span class="text-green-500">Portfolio</span>
        </h2>
        <p
          class="mt-3 text-sm text-slate-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          A selection of enterprise systems and professional applications
          developed for industry leaders, showcasing technical depth and
          problem-solving.
        </p>
      </div>
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 sm:gap-6"
      >
        <UtilsCardProject
          v-for="(project, index) in projects"
          :key="index"
          :title="project.title"
          :imageSrc="project.imageSrc"
          :description="project.description"
          :tech="project.tech"
          :linkProject="project.linkProject"
          :isPrivat="project.isPrivat"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import projects from '../list/project';
</script>
