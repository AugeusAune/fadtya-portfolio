<template>
  <div class="px-4 sm:px-6 py-12 sm:py-16 lg:py-24" id="contact">
    <div class="max-w-6xl mx-auto">
      <div
        class="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl"
      >
        <div
          class="grid lg:grid-cols-2 grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-gray-800"
        >
          <!-- Left -->
          <div class="p-5 sm:p-8 lg:p-10 bg-slate-50/50 dark:bg-gray-900/20 reveal-on-scroll">
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4"
            >
              Get in touch for <br />
              <span
                class="text-blue-600 dark:text-blue-400 underline decoration-blue-500/30 underline-offset-4"
                >technical</span
              >
              collaboration.
            </h2>
            <p
              class="text-sm sm:text-base text-slate-600 dark:text-gray-300 mb-8 max-w-md leading-relaxed"
            >
              Available for full-stack engineering roles, enterprise systems consulting, or backend architecture discussions.
            </p>

            <div class="space-y-3">
              <a
                v-for="(item, index) in list"
                :key="index"
                :href="item.link"
                target="_blank"
                class="group flex items-center gap-4 p-2 pr-4 rounded-2xl bg-white dark:bg-gray-800/40 border border-slate-200/60 dark:border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div
                  class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-gray-800 group-hover:bg-blue-500 text-slate-600 dark:text-gray-400 group-hover:text-white transition-all duration-300 shrink-0"
                >
                  <Icon :name="item.icon" class="text-xl" />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-[9px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-0.5"
                  >
                    {{ item.name }}
                  </p>
                  <p
                    class="text-sm font-bold text-slate-900 dark:text-white truncate"
                  >
                    {{
                      item.name === 'WhatsApp' ? '+62 859-2075-4983' : item.name
                    }}
                  </p>
                </div>
                <Icon
                  name="ph:caret-right-bold"
                  class="text-slate-300 dark:text-gray-700 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all text-sm shrink-0"
                />
              </a>
            </div>
          </div>

          <!-- Right -->
          <div class="p-5 sm:p-8 lg:p-10 bg-white dark:bg-transparent reveal-on-scroll stagger-delay-2">
            <form @submit.prevent="sendMessage" class="space-y-5">
              <div class="space-y-3">
                <div class="group relative">
                  <label
                    class="block text-[9px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1.5 px-1"
                    >Email Connection</label
                  >
                  <div class="relative">
                    <Icon
                      name="ph:envelope-simple-duotone"
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    />
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      class="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div class="group relative">
                  <label
                    class="block text-[9px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1.5 px-1"
                    >Project Subject</label
                  >
                  <div class="relative">
                    <Icon
                      name="ph:chat-circle-text-duotone"
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    />
                    <input
                      v-model="form.subject"
                      type="text"
                      required
                      placeholder="Project Inquiry"
                      class="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div class="group relative">
                  <label
                    class="block text-[9px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1.5 px-1"
                    >Detailed Brief</label
                  >
                  <div class="relative">
                    <Icon
                      name="ph:pencil-circle-duotone"
                      class="absolute left-4 top-4 text-lg text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    />
                    <textarea
                      v-model="form.message"
                      rows="4"
                      required
                      placeholder="Describe your project, timeline, or inquiry..."
                      class="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Icon
                  name="ph:paper-plane-tilt-fill"
                  class="text-base"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import list from '../list/list-contact';

  const form = reactive({ email: '', subject: '', message: '' });

  const sendMessage = () => {
    const mailtoLink = `mailto:farhanaditya134@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent('From: ' + form.email + '\n\n' + form.message)}`;
    window.location.href = mailtoLink;
  };
</script>
