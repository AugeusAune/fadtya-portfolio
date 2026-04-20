<template>
  <div class="px-6 py-24 lg:py-32" id="skills">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col items-center text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
          Tech Stack
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Modern Skills For<br/>
          <span class="text-green-500">Modern Solutions</span>
        </h2>
        <p class="mt-6 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          A comprehensive suite of technologies I've mastered to deliver high-performance, maintainable, and scalable software.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <UtilsCard
          v-for="(data, index) in skils"
          :key="index"
          :icon="data.icon"
          :name="data.name"
          :text="data.text"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import skils from "../list/skils";
</script>
