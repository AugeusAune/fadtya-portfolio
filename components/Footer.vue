<template>
  <footer class="py-8 border-t border-slate-200 dark:border-gray-800">
    <div class="max-w-6xl mx-auto px-6">
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
      >
        <!-- Brand -->
        <div class="space-y-2">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <div
              class="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center font-black text-sm"
            >
              F
            </div>
            <span
              class="text-slate-900 dark:text-white font-black text-lg tracking-tighter"
              >Farhan<span class="text-blue-500">.</span></span
            >
          </div>
          <p
            class="text-slate-500 dark:text-gray-500 text-xs max-w-xs leading-relaxed"
          >
            Farhan Aditya · Full Stack Engineer
          </p>
        </div>

        <!-- Nav -->
        <div
          class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold"
        >
          <a
            href="#about"
            class="py-2.5 px-2 min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >Experience</a
          >
          <a
            href="#education"
            class="py-2.5 px-2 min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >Education</a
          >
          <a
            href="#skills"
            class="py-2.5 px-2 min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >Skills</a
          >
          <a
            href="#projects"
            class="py-2.5 px-2 min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >Projects</a
          >
          <a
            href="#contact"
            class="py-2.5 px-2 min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >Contact</a
          >
        </div>

        <!-- Social + copyright -->
        <div class="flex flex-col items-center md:items-end gap-3">
          <div class="flex gap-2.5">
            <a
              href="https://github.com/AugeusAune"
              target="_blank"
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Icon name="mdi:github" class="text-xl" />
            </a>
            <a
              href="https://linkedin.com/in/farhanadityaa"
              target="_blank"
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Icon name="mdi:linkedin" class="text-xl" />
            </a>
          </div>
          <p
            class="text-[11px] text-slate-500 dark:text-gray-500 text-center md:text-right"
          >
            © {{ year }} Farhan Aditya. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const year = new Date().getFullYear();
</script>
