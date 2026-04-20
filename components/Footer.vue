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
            Built with passion and modern technology. Focused on delivering
            high-quality digital solutions.
          </p>
        </div>

        <!-- Nav -->
        <div
          class="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest"
        >
          <a
            href="#about"
            class="text-slate-400 dark:text-gray-500 hover:text-blue-500 transition-colors"
            >Experience</a
          >
          <a
            href="#projects"
            class="text-slate-400 dark:text-gray-400 hover:text-blue-500 transition-colors"
            >Projects</a
          >
          <a
            href="#contact"
            class="text-slate-400 dark:text-gray-400 hover:text-blue-500 transition-colors"
            >Contact</a
          >
        </div>

        <!-- Social + copyright -->
        <div class="flex flex-col items-center md:items-end gap-2">
          <div class="flex gap-3">
            <a
              href="https://github.com/AugeusAune"
              target="_blank"
              class="text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors text-xl"
            >
              <Icon name="mdi:github" />
            </a>
            <a
              href="https://linkedin.com/in/farhanadityaa"
              target="_blank"
              class="text-slate-400 dark:text-gray-500 hover:text-[#0077b5] transition-colors text-xl"
            >
              <Icon name="mdi:linkedin" />
            </a>
          </div>
          <p
            class="text-[9px] text-slate-400 dark:text-gray-600 font-bold uppercase tracking-widest"
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
