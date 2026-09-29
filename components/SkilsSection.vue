<template>
  <div class="px-4 sm:px-6 py-12 sm:py-16 lg:py-24" id="skills">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center text-center mb-10 sm:mb-14 reveal-on-scroll">
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight"
        >
          Technical Stack &amp; <span class="text-blue-600 dark:text-blue-400">Expertise</span>
        </h2>
        <p
          class="mt-3 text-sm sm:text-base text-slate-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed"
        >
          Core languages, frameworks, and architectural tools utilized across production systems and high-throughput web applications.
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
          :class="'reveal-on-scroll stagger-delay-' + ((index % 4) + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import skils from '../list/skils';
</script>
