<template>
  <div class="px-6 py-24 lg:py-32" id="education">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-5 grid-cols-1 gap-16 items-start">
        <!-- Sidebar Info -->
        <div class="lg:col-span-2 lg:sticky lg:top-24 space-y-8">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              Academic Background
            </div>
            <h1 class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-4" >
              My <span class="text-blue-500">Education</span>
            </h1>
            <p class="text-base text-slate-600 dark:text-gray-400 mt-6 leading-relaxed" >
              Education is the foundation of my professional growth. I combine formal academic learning with continuous self-study to stay at the forefront of technological advancements.
            </p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="lg:col-span-3 pb-12">
          <UtilsTimeline :data="education" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import education from "../list/education";
</script>
