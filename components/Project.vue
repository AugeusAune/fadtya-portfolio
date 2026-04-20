<template>
  <div class="px-6 py-24 lg:py-32" id="projects">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col items-center text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
          Case Studies
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Featured <span class="text-green-500">Portfolio</span>
        </h2>
        <p class="mt-6 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
          A selection of enterprise systems and professional applications developed for industry leaders, showcasing technical depth and problem-solving.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
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
import projects from "../list/project";
</script>
