<template>
  <div class="relative py-14 sm:py-20 lg:py-24 overflow-hidden" id="home">
    <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      <!-- Text Column (7 cols) -->
      <div class="lg:col-span-7 text-center lg:text-left reveal-on-scroll">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800/80 border border-slate-200/80 dark:border-gray-700 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          Jakarta, Indonesia · Full Stack Engineer
        </div>

        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight"
        >
          Engineering Scalable Apps &amp;<br />
          <span class="text-blue-600 dark:text-blue-400">Enterprise Backend</span> Systems
        </h1>

        <p
          class="mt-5 text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
        >
          I'm
          <span class="font-bold text-slate-900 dark:text-white">Farhan Aditya</span>,
          a Full Stack Engineer building high-throughput backend services, TypeScript applications, Nuxt 4 architectures, and mission-critical enterprise systems.
        </p>

        <div
          class="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mt-8"
        >
          <a
            href="#projects"
            class="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md"
          >
            View Projects
          </a>
          <a
            href="/cv.pdf"
            download
            class="px-6 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100 border border-slate-300/80 dark:border-gray-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-gray-750 transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
          >
            <Icon name="ph:file-pdf-bold" class="text-base text-blue-600 dark:text-blue-400" />
            Download Resume
          </a>
        </div>
      </div>

      <!-- Architecture Impact Card (5 cols) -->
      <div class="lg:col-span-5 reveal-on-scroll stagger-delay-2">
        <div
          class="rounded-2xl border border-slate-200/90 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-gray-800">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
              Technical Focus
            </span>
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
              Active Production
            </span>
          </div>

          <div class="space-y-4 py-5">
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800/40 border border-slate-200/70 dark:border-gray-700/50">
              <div class="text-xs font-bold text-slate-900 dark:text-white mb-1">
                E-Procurement &amp; ERP Systems
              </div>
              <div class="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Contract lifecycle and purchase order automation for PT Indo Raya Tenaga.
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800/40 border border-slate-200/70 dark:border-gray-700/50">
              <div class="text-xs font-bold text-slate-900 dark:text-white mb-1">
                Multi-Entity Tax &amp; OCR Engine
              </div>
              <div class="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                VAT reconciliation across 23 subsidiary entities with SAP integration.
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800/40 border border-slate-200/70 dark:border-gray-700/50">
              <div class="text-xs font-bold text-slate-900 dark:text-white mb-1">
                Full-Stack Architecture
              </div>
              <div class="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Nuxt 4, Vue 3, TypeScript, Elysia.js, Laravel, Redis queues, and Docker.
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400">
            <span>Primary Core</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">TypeScript · SQL · Docker</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
