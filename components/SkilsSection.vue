<template>
  <div class="px-4 sm:px-6 py-16 lg:py-24" id="skills">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center text-center mb-8 sm:mb-14">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3"
        >
          Tech Stack
        </div>
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight"
        >
          Modern Skills For<br />
          <span class="text-blue-500">Modern Solutions</span>
        </h2>
        <p
          class="mt-3 text-xs sm:text-sm text-slate-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          A comprehensive suite of technologies I've mastered to deliver
          high-performance, maintainable, and scalable software.
        </p>
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
      >
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
  import skils from '../list/skils';
</script>
