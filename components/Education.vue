<template>
  <div class="px-4 sm:px-6 py-12 sm:py-16 lg:py-24" id="education">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-5 grid-cols-1 gap-8 lg:gap-16 items-start">
        <!-- Sidebar Info -->
        <div class="lg:col-span-2 lg:sticky lg:top-24 space-y-8 reveal-on-scroll">
          <div>
            <h2 class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-4">
              Academic <span class="text-blue-600 dark:text-blue-400">Foundation</span>
            </h2>
            <p class="text-sm sm:text-base text-slate-600 dark:text-gray-300 mt-6 leading-relaxed">
              Formal training in Informatics Engineering, combined with continuous hands-on research into database performance, distributed architectures, and modern web frameworks.
            </p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="lg:col-span-3 pb-12 reveal-on-scroll stagger-delay-2">
          <UtilsTimeline :data="education" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import education from "../list/education";
</script>
