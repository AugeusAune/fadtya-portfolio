<template>
  <div class="px-6 py-24 lg:py-32" id="contact">
    <div class="max-w-6xl mx-auto shadow-2xl rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-gray-800 transition-colors duration-300">
      <div class="grid lg:grid-cols-2 grid-cols-1">
        <!-- Info Column -->
        <div class="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/60">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
            Get In Touch
          </div>
          <h2 class="text-slate-900 dark:text-white font-black text-3xl lg:text-5xl leading-tight mb-6">
            Let's Start a <br/><span class="text-green-500">Conversation</span>
          </h2>
          <p class="text-slate-600 dark:text-gray-400 text-base leading-relaxed mb-10">
            Interested in collaborating or have a project in mind? reach out via the form, or connect through my social channels. I usually respond within 24 hours.
          </p>
          
          <div class="grid grid-cols-1 gap-4">
            <a v-for="(data, index) in list" :key="index" :href="data.link" target="_blank" 
               class="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 hover:border-green-500/40 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all group shadow-sm">
              <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-gray-800 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <Icon :name="data.icon" class="text-2xl" />
              </div>
              <div class="text-start">
                <p class="text-[10px] text-slate-500 dark:text-gray-500 font-black uppercase tracking-wider">{{ data.name }}</p>
                <p class="text-base text-slate-900 dark:text-white font-bold">{{ data.name === 'WhatsApp' ? '+62 851 5654 5134' : data.name }}</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Form Column -->
        <div class="p-10 lg:p-16 bg-white dark:bg-[#0f172a]/40">
          <form @submit.prevent="sendMessage" class="space-y-6">
            <div>
              <label for="email" class="block mb-2 text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em]">Your Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400 dark:text-gray-500">
                  <Icon name="ph:envelope-simple-fill" />
                </div>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  class="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 block w-full ps-12 p-4 placeholder-slate-400 transition-all outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block mb-2 text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em]">Subject</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400 dark:text-gray-500">
                  <Icon name="ph:chat-circle-dots-fill" />
                </div>
                <input
                  v-model="form.subject"
                  type="text"
                  id="subject"
                  class="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 block w-full ps-12 p-4 placeholder-slate-400 transition-all outline-none"
                  placeholder="How can I help you?"
                  required
                />
              </div>
            </div>

            <div>
              <label for="message" class="block mb-2 text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em]">Message</label>
              <div class="relative">
                <div class="absolute top-4 start-4 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
                  <Icon name="ph:pencil-circle-fill" />
                </div>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="4"
                  class="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 block w-full ps-12 p-4 placeholder-slate-400 transition-all outline-none"
                  placeholder="Tell me about your amazing project..."
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" class="w-full flex items-center justify-center gap-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-500/50 font-black rounded-2xl text-lg px-6 py-4 transition-all active:scale-95 shadow-xl shadow-green-500/25">
              <Icon name="ph:paper-plane-tilt-fill" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import list from "../list/list-contact";

const form = reactive({
  email: '',
  subject: '',
  message: ''
});

const sendMessage = () => {
  const mailtoLink = `mailto:farhanaditya134@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent('From: ' + form.email + '\n\n' + form.message)}`;
  window.location.href = mailtoLink;
};
</script>
