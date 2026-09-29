<template>
  <div class="px-6 py-24 lg:py-32" id="about">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-5 grid-cols-1 gap-16 items-start">
        <!-- Experience sidebar -->
        <aside class="lg:col-span-2 lg:sticky lg:top-24 space-y-8 reveal-on-scroll">
          <!-- Heading -->
          <div class="space-y-4">
            <h2
              class="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight"
            >
              Work <span class="text-blue-600 dark:text-blue-400">Experience</span>
            </h2>
            <p
              class="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed"
            >
              Specializing in enterprise procurement systems, automated OCR tax reconciliation, and scalable web architectures across multi-entity corporations.
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
                class="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Icon :name="link.icon" class="text-lg" />
              </a>
            </div>
          </div>
        </aside>

        <!-- Timeline -->
        <div class="lg:col-span-3 pb-12 reveal-on-scroll stagger-delay-2">
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
