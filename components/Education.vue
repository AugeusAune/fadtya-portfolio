<template>
  <div class="px-6 py-24 lg:py-32" id="education">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-5 grid-cols-1 gap-16 items-start">
        <!-- Sidebar Info -->
        <div class="lg:col-span-2 lg:sticky lg:top-32 space-y-8 order-1 lg:order-2">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
              Academic Background
            </div>
            <h1 class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-4" >
              My <span class="text-green-500">Education</span>
            </h1>
            <p class="text-base text-slate-600 dark:text-gray-400 mt-6 leading-relaxed" >
              Education is the foundation of my professional growth. I combine formal academic learning with continuous self-study to stay at the forefront of technological advancements.
            </p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="lg:col-span-3 order-2 lg:order-1 max-h-[700px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-thumb-green-500/30 scrollbar-track-transparent">
          <UtilsTimeline :data="education" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import education from "../list/education";
</script>
