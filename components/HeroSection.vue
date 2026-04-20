<template>
  <div class="relative py-20 lg:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <!-- Text Side -->
      <div class="relative z-10 text-center lg:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for New Projects
        </div>
        
        <h1 class="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
          Crafting Digital<br/>
          <span class="text-green-500">Experiences</span> That Matter
        </h1>
        
        <p class="mt-8 text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
          I'm <span class="font-bold text-slate-900 dark:text-white underline decoration-green-500/30">Farhan Aditya</span>, 
          a Full Stack Developer dedicated to building efficient, scalable, and user-centric applications for modern businesses.
        </p>

        <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10">
          <a href="#projects" class="px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-green-500/20">
            View My Projects
          </a>
          <a href="/cv.pdf" download class="px-8 py-4 rounded-2xl bg-slate-200 dark:bg-gray-800 text-slate-900 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
            <Icon name="ph:download-simple-bold" />
            Download CV
          </a>
        </div>
      </div>

      <!-- Code Block Side (Desktop Only) -->
      <div class="relative hidden lg:block group">
        <div class="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
          <div class="flex items-center justify-between px-6 py-4 bg-gray-900/50 border-b border-gray-800">
            <div class="flex gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div class="text-xs text-gray-500 font-mono">DeveloperIdentity.js</div>
            <Icon name="ph:copy-bold" class="text-gray-600 text-sm" />
          </div>
          <div class="p-8">
            <highlightjs language="js" :code="code" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const birthDate = new Date('2003-10-21');
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

const code = `const developer = {
  name: "Farhan Aditya",
  role: "Full Stack Developer",
  experience: "4+ Years",
  skills: ["Vue/Nuxt", "Laravel", "Postgres", "Elysia.js"],
  status: "Available_For_Hiring",
  location: "Jakarta, Indonesia",
  motto: "Code for life, life for code"
};

function deliverExcellence(project) {
  return project.transform({
    quality: "Premium",
    speed: "Fast",
    result: "Perfect"
  });
}`;
</script>

<style scoped>
pre code.hljs {
  padding: 0;
  background: transparent !important;
}
</style>
