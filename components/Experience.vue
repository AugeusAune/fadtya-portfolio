<template>
  <div class="px-6 py-24 lg:py-32" id="about">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-5 grid-cols-1 gap-16 items-start">
        <!-- Sidebar — sticky beneran -->
        <aside class="lg:col-span-2 lg:sticky lg:top-24 space-y-8">
          <!-- Badge + Heading -->
          <div class="space-y-4">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest"
            >
              Career Journey
            </span>
            <h2
              class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight"
            >
              My <span class="text-green-500">Experience</span>
            </h2>
            <p
              class="text-sm text-slate-500 dark:text-gray-400 leading-relaxed"
            >
              I have transformed coding into a lifelong craft. From my first
              lines of code to leading complex enterprise engineering projects,
              I view every challenge as an opportunity to build something
              exceptional.
            </p>
          </div>

          <!-- Social Links -->
          <div class="space-y-3">
            <p
              class="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-widest"
            >
              Connect Professionally
            </p>
            <div class="flex gap-3">
              <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.href"
                target="_blank"
                :aria-label="link.name"
                class="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 hover:border-green-500/40 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Icon :name="link.icon" class="text-lg" />
              </a>
            </div>
          </div>
        </aside>

        <!-- Timeline -->
        <div class="lg:col-span-3 pb-12">
          <UtilsTimeline :data="experience" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import experience from '../list/experience';

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'mdi:linkedin',
      href: 'https://www.linkedin.com/in/farhanadityaa/',
    },
    {
      name: 'GitHub',
      icon: 'mdi:github',
      href: 'https://github.com/AugeusAune',
    },
  ];
</script>
