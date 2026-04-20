<template>
  <nav class="sticky top-0 z-[100] bg-white/80 dark:bg-[#020420]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="#home" class="flex items-center gap-2 group">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500 text-white font-black group-hover:rotate-12 transition-transform">
            F
          </div>
          <span class="text-slate-900 dark:text-white font-black text-xl tracking-tighter">
            Farhan<span class="text-green-500">.</span>
          </span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6 lg:gap-8">
          <a v-for="item in navItems" :key="item.id" :href="item.href" class="text-slate-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500 font-bold text-xs uppercase tracking-widest transition-colors">
            {{ item.name }}
          </a>
        </div>

        <!-- Right: Theme Toggle & Menu -->
        <div class="flex items-center gap-3">
          <!-- Theme Toggle (Prominent) -->
          <button @click="toggleTheme" class="flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-yellow-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 transition-all active:scale-90 shadow-lg border border-slate-200 dark:border-gray-700" aria-label="Toggle Theme">
            <Icon :name="colorMode.value === 'dark' ? 'ph:moon-stars-fill' : 'ph:sun-fill'" class="text-xl" />
          </button>
          
          <!-- Socials (Desktop) -->
          <div class="hidden lg:flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-4 ml-1">
            <a href="https://github.com/AugeusAune" target="_blank" class="text-slate-500 dark:text-gray-400 hover:text-green-500 transition-colors">
              <Icon name="mdi:github" class="text-xl" />
            </a>
            <a href="https://linkedin.com/in/farhanadityaa" target="_blank" class="text-slate-500 dark:text-gray-400 hover:text-green-500 transition-colors">
              <Icon name="mdi:linkedin" class="text-xl" />
            </a>
          </div>

          <!-- Mobile Toggle -->
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition-all" aria-label="Menu">
            <Icon :name="isMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="text-2xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform -translate-y-4 opacity-0">
      <div v-if="isMenuOpen" class="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-[#020420] border-b border-gray-200 dark:border-gray-800 px-6 py-8 space-y-6 shadow-2xl overflow-y-auto max-h-[80vh]">
        <a v-for="item in navItems" :key="item.id" :href="item.href" @click="isMenuOpen = false" class="block text-2xl font-black text-slate-400 dark:text-gray-500 hover:text-green-500 transition-colors tracking-tighter">
          {{ item.name }}
        </a>
        <div class="flex gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <a href="https://github.com/AugeusAune" target="_blank" class="text-slate-400 dark:text-gray-500 text-3xl">
            <Icon name="mdi:github" />
          </a>
          <a href="https://linkedin.com/in/farhanadityaa" target="_blank" class="text-slate-400 dark:text-gray-500 text-3xl">
            <Icon name="mdi:linkedin" />
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

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
</script>
