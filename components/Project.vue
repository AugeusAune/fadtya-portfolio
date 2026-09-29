<template>
  <div class="px-4 sm:px-6 py-12 sm:py-16 lg:py-24" id="projects">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center text-center mb-10 sm:mb-14 reveal-on-scroll">
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight"
        >
          Featured <span class="text-blue-600 dark:text-blue-400">Projects</span>
        </h2>
        <p
          class="mt-3 text-sm sm:text-base text-slate-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed"
        >
          A selection of enterprise systems and client applications showcasing backend architecture, frontend performance, and end-to-end delivery.
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
          :class="'reveal-on-scroll stagger-delay-' + ((index % 3) + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import projects from '../list/project';
</script>
