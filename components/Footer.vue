<template>
  <footer class="py-12 border-t border-slate-200 dark:border-gray-800 transition-colors">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div class="space-y-4">
          <div class="flex items-center justify-center md:justify-start gap-2 group">
            <div class="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center font-black">F</div>
            <span class="text-slate-900 dark:text-white font-black text-xl tracking-tighter">Farhan<span class="text-green-500">.</span></span>
          </div>
          <p class="text-slate-500 dark:text-gray-500 text-sm max-w-xs">
            Built with passion and modern technology. Focused on delivering high-quality digital solutions.
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest">
          <a href="#about" class="text-slate-400 dark:text-gray-500 hover:text-green-500 transition-colors">Experience</a>
          <a href="#projects" class="text-slate-400 dark:text-gray-400 hover:text-green-500 transition-colors">Projects</a>
          <a href="#contact" class="text-slate-400 dark:text-gray-400 hover:text-green-500 transition-colors">Contact</a>
        </div>

        <div class="flex flex-col items-center md:items-end gap-2">
          <div class="flex gap-4">
             <a href="https://github.com/AugeusAune" target="_blank" class="text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors text-2xl">
              <Icon name="mdi:github" />
            </a>
            <a href="https://linkedin.com/in/farhanadityaa" target="_blank" class="text-slate-400 dark:text-gray-500 hover:text-[#0077b5] transition-colors text-2xl">
              <Icon name="mdi:linkedin" />
            </a>
          </div>
          <p class="text-[10px] text-slate-400 dark:text-gray-600 font-bold uppercase tracking-widest">
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
