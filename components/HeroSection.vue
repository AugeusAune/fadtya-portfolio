<template>
  <div class="relative py-16 lg:py-24 overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text Side -->
      <div class="relative z-10 text-center lg:text-left reveal-on-scroll">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-5"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
            ></span>
          </span>
          Available for New Projects
        </div>

        <h1
          class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight"
        >
          Engineering Scalable Apps &amp;<br />
          <span class="text-blue-500">Robust Distributed</span> Systems
        </h1>

        <p
          class="mt-5 text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
        >
          I'm
          <span
            class="font-bold text-slate-900 dark:text-white underline decoration-blue-500/30"
            >Farhan Aditya</span
          >
          — a Full Stack Engineer focused on high-throughput backend services, TypeScript, Nuxt 4, and reliable enterprise systems.
        </p>

        <div
          class="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8"
        >
          <a
            href="#projects"
            class="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            View Case Studies
          </a>
          <a
            href="/cv.pdf"
            download
            class="px-6 py-3 rounded-xl bg-slate-200 dark:bg-gray-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-300 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <Icon name="ph:download-simple-bold" />
            Download CV
          </a>
        </div>
      </div>

      <!-- Code Block Side -->
      <div class="relative hidden lg:block group reveal-on-scroll stagger-delay-2">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-25 animate-soft-glow group-hover:opacity-50 transition duration-1000"
        ></div>
        <div
          class="relative bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden border border-gray-800"
        >
          <div
            class="flex items-center justify-between px-5 py-3 bg-gray-900/50 border-b border-gray-800"
          >
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-blue-500/50"></div>
            </div>
            <div class="text-[10px] text-gray-500 font-mono">
              engineer.service.ts
            </div>
            <Icon name="ph:copy-bold" class="text-gray-600 text-xs" />
          </div>
          <div class="p-6">
            <highlightjs language="js" :code="code" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const code = `import { Elysia, t } from "elysia";
import { queryDatabase } from "./db";

export const engineer = new Elysia({ prefix: "/api/v1" })
  .get("/profile", async () => ({
    name: "Farhan Aditya",
    title: "Full Stack Engineer",
    location: "Jakarta, Indonesia",
    coreStack: ["Nuxt 4", "Elysia.js", "Laravel", "PostgreSQL"],
    systemsDelivered: ["Procurement ERP", "Tax Projection", "Compliance"]
  }))
  .get("/metrics", async () => {
    return await queryDatabase.getSystemHealth();
  }, {
    response: t.Object({ uptime: t.String(), latency: t.String() })
  });`;
</script>

<style scoped>
  pre code.hljs {
    padding: 0;
    background: transparent !important;
  }
</style>
