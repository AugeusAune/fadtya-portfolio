<template>
  <nav class="sticky top-0 z-[100] bg-white/80 dark:bg-[#020420]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="#home" class="flex items-center gap-2 group">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 text-white font-black group-hover:rotate-12 transition-transform">
            F
          </div>
          <span class="text-slate-900 dark:text-white font-black text-xl tracking-tighter">
            Farhan<span class="text-blue-500">.</span>
          </span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6 lg:gap-8">
          <a v-for="item in navItems" :key="item.id" :href="item.href" class="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs uppercase tracking-wider transition-colors">
            {{ item.name }}
          </a>
        </div>

        <!-- Right: Theme Toggle & Menu -->
        <div class="flex items-center gap-3">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-amber-400 transition-all duration-200 active:scale-95 border border-slate-200/80 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Icon :name="colorMode.value === 'dark' ? 'ph:moon-stars-fill' : 'ph:sun-dim-fill'" class="text-xl transition-transform duration-300 hover:rotate-12" />
          </button>
          
          <!-- Socials (Desktop) -->
          <div class="hidden lg:flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-4 ml-1">
            <a href="https://github.com/AugeusAune" target="_blank" class="text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Icon name="mdi:github" class="text-xl" />
            </a>
            <a href="https://linkedin.com/in/farhanadityaa" target="_blank" class="text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Icon name="mdi:linkedin" class="text-xl" />
            </a>
          </div>

          <!-- Mobile Menu Toggle Button (44px target) -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <Icon :name="isMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="text-2xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer & Backdrop -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden absolute top-16 inset-x-0 bg-white/95 dark:bg-[#020420]/95 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800 px-5 py-6 shadow-2xl overflow-y-auto max-h-[calc(100dvh-4rem)]"
      >
        <div class="space-y-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="isMenuOpen = false"
            class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-[0.99]"
          >
            <span>{{ item.name }}</span>
            <Icon name="ph:caret-right-bold" class="text-sm text-slate-400 dark:text-gray-600" />
          </a>
        </div>

        <div class="flex items-center gap-3 pt-5 mt-4 border-t border-slate-200/80 dark:border-gray-800">
          <a
            href="https://github.com/AugeusAune"
            target="_blank"
            class="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <Icon name="mdi:github" class="text-xl" />
          </a>
          <a
            href="https://linkedin.com/in/farhanadityaa"
            target="_blank"
            class="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Icon name="mdi:linkedin" class="text-xl" />
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const colorMode = useColorMode();
const isMenuOpen = ref(false);

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

watch(isMenuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = '';
  }
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
