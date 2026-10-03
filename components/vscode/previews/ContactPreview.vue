<template>
  <div class="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="border-b border-[var(--vscode-border)] pb-4 space-y-1">
      <div class="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        Get in Touch
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-[var(--vscode-text)]">
        Contact & Collaboration Channels
      </h2>
      <p class="text-xs md:text-sm text-[var(--vscode-text-muted)]">
        Reach out directly via direct messaging or social developer networks.
      </p>
    </div>

    <!-- Quick Channels -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="channel in contactChannels"
        :key="channel.name"
        :href="channel.link"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 p-4 rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 hover:bg-[var(--vscode-accent)]/10 hover:border-[var(--vscode-accent)]/50 transition-all group"
      >
        <div class="w-10 h-10 rounded-lg bg-[var(--vscode-bg)] flex items-center justify-center p-2 border border-[var(--vscode-border)]">
          <Icon :name="channel.icon" class="text-xl group-hover:scale-110 transition-transform" />
        </div>
        <div class="overflow-hidden">
          <div class="text-xs text-[var(--vscode-text-muted)] font-medium">Channel</div>
          <div class="text-sm font-bold text-[var(--vscode-text)] truncate">{{ channel.name }}</div>
        </div>
      </a>
    </div>

    <!-- Interactive Message Form -->
    <div class="rounded-2xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/50 p-6 md:p-8 space-y-6">
      <div class="flex items-center gap-2 text-sm font-bold text-[var(--vscode-text)]">
        <Icon name="mdi:send" class="text-[var(--vscode-accent)] text-lg" />
        Send Direct Transmission
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs md:text-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="font-medium text-[var(--vscode-text)]">Your Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Alex Smith"
              class="w-full px-3 py-2 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] focus:outline-none focus:border-[var(--vscode-accent)] transition-colors"
            />
          </div>

          <div class="space-y-1">
            <label class="font-medium text-[var(--vscode-text)]">Your Email *</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="alex@company.com"
              class="w-full px-3 py-2 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] focus:outline-none focus:border-[var(--vscode-accent)] transition-colors"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="font-medium text-[var(--vscode-text)]">Message *</label>
          <textarea
            v-model="form.message"
            rows="4"
            required
            placeholder="Tell me about your project, idea, or role..."
            class="w-full px-3 py-2 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] focus:outline-none focus:border-[var(--vscode-accent)] transition-colors resize-none"
          />
        </div>

        <div v-if="feedback" :class="feedback.isError ? 'text-rose-400' : 'text-emerald-400'" class="text-xs font-semibold">
          {{ feedback.text }}
        </div>

        <button
          type="submit"
          :disabled="isSending"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--vscode-accent)] text-white hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          <Icon name="mdi:email-fast-outline" class="text-base" />
          <span>{{ isSending ? 'Transmitting...' : 'Send Message' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import contactChannels from '../../../list/list-contact.js';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const isSending = ref(false);
const feedback = ref<{ text: string; isError: boolean } | null>(null);

const handleSubmit = (): void => {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    feedback.value = { text: 'Please fill in all required fields.', isError: true };
    return;
  }

  isSending.value = true;
  feedback.value = null;

  // Open direct mail client fallback with pre-filled content
  const mailto = `mailto:farhanaditya134@gmail.com?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\nMessage:\n${form.message}`)}`;
  
  if (typeof window !== 'undefined') {
    window.location.href = mailto;
  }

  setTimeout(() => {
    isSending.value = false;
    feedback.value = {
      text: 'Message client prepared! Thank you for reaching out.',
      isError: false
    };
    form.name = '';
    form.email = '';
    form.message = '';
  }, 400);
};
</script>
