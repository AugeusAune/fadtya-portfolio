<template>
  <div class="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="border-b border-[var(--vscode-border)] pb-4 space-y-1">
      <div class="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        Technical Capabilities
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-[var(--vscode-text)]">
        Skills, Frameworks & Tooling
      </h2>
      <p class="text-xs md:text-sm text-[var(--vscode-text-muted)]">
        Technologies and frameworks utilized in daily production engineering.
      </p>
    </div>

    <!-- Categorized Grid -->
    <div class="space-y-6">
      <div
        v-for="group in skillGroups"
        :key="group.category"
        class="space-y-3"
      >
        <div class="flex items-center gap-2 text-sm font-bold text-[var(--vscode-text)]">
          <Icon :name="group.icon" class="text-[var(--vscode-accent)] text-lg" />
          {{ group.category }}
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div
            v-for="skill in group.skills"
            :key="skill.name"
            class="flex items-center gap-3 p-3 rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 hover:bg-[var(--vscode-accent)]/10 hover:border-[var(--vscode-accent)]/40 transition-all group"
          >
            <div class="w-8 h-8 rounded-lg bg-[var(--vscode-bg)] flex items-center justify-center p-1.5 shrink-0 border border-[var(--vscode-border)]">
              <Icon :name="skill.icon" class="text-xl group-hover:scale-110 transition-transform" />
            </div>
            <div class="overflow-hidden">
              <div class="font-bold text-xs text-[var(--vscode-text)] truncate">
                {{ skill.name }}
              </div>
              <div class="text-[10px] text-[var(--vscode-text-muted)] truncate">
                {{ skill.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import skillsData from '../../../list/skils.js';

interface SkillItem {
  icon: string;
  name: string;
  text: string;
}

const skillGroups = [
  {
    category: 'Backend & Services',
    icon: 'mdi:server',
    skills: skillsData.filter(s =>
      ['Laravel', 'PHP', 'Node.js', 'Elysia.js', 'Tesseract OCR'].includes(s.name)
    )
  },
  {
    category: 'Frontend & UI',
    icon: 'mdi:monitor-cellphone',
    skills: skillsData.filter(s =>
      ['Vue.js', 'Nuxt.js', 'JavaScript'].includes(s.name)
    )
  },
  {
    category: 'Databases & In-Memory',
    icon: 'mdi:database',
    skills: skillsData.filter(s =>
      ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis'].includes(s.name)
    )
  },
  {
    category: 'DevOps & Containers',
    icon: 'mdi:cloud-outline',
    skills: skillsData.filter(s =>
      ['Docker'].includes(s.name)
    )
  }
];
</script>
