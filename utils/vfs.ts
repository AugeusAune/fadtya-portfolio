import skillsData from '../list/skils.js';
import projectsData from '../list/project.js';
import experienceData from '../list/experience.js';
import educationData from '../list/education.js';
import contactData from '../list/list-contact.js';

export interface VFSFile {
  id: string;
  name: string;
  folder: 'src' | 'docs' | 'config';
  path: string;
  icon: string;
  language: 'markdown' | 'vue' | 'typescript' | 'json' | 'dotenv';
  codeContent: string;
  previewComponent: string;
  description: string;
}

const generateReadmeCode = (): string => `# Farhan Aditya
Full Stack Developer & Software Engineer

Welcome to my interactive developer portfolio environment!

## Quick Summary
- 📍 Location: Jakarta, Indonesia
- 💼 Current: Fullstack Programmer @ PT Lamjaya Global Solusi
- 🛠 Focus: High-performance web applications, Vue/Nuxt, Laravel, PostgreSQL, Redis, Docker
- 🎯 Philosophy: Clean code, SOLID design, pragmatic problem solving

## Navigation
Use the File Explorer on the left, or press Ctrl+P / Cmd+K to open the Command Palette.
Open the integrated terminal below (Ctrl+\`) to run CLI commands like 'skills', 'projects', or 'theme'.

\`\`\`bash
$ visitor@farhan-portfolio:~$ help
\`\`\`
`;

const generateAboutCode = (): string => `<template>
  <div class="developer-profile">
    <h1>Farhan Aditya</h1>
    <p class="role">Full Stack Developer & Software Engineer</p>
    <div class="bio">
      Passionate about crafting scalable, maintainable architectures.
      Experienced in enterprise systems, procurement workflows, tax calculation platforms,
      and distributed caching with Redis.
    </div>
  </div>
</template>

<script setup lang="ts">
const engineer = {
  name: "Farhan Aditya",
  focus: ["Vue 3", "Nuxt 4", "Laravel", "PostgreSQL", "Bun", "Docker"],
  experienceYears: 4,
  status: "Open to exciting opportunities"
};
</script>
`;

const generateSkillsCode = (): string => `export interface SkillCategory {
  category: string;
  skills: Array<{ name: string; type: string; proficiency: number }>;
}

export const technicalSkills: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: ${JSON.stringify(
      skillsData.map(s => ({ name: s.name, type: s.text, proficiency: 90 })),
      null,
      2
    )}
  }
];
`;

const generateProjectsCode = (): string => JSON.stringify(
  {
    featuredProjects: projectsData.map(p => ({
      title: p.title,
      description: p.description,
      techStack: p.tech,
      liveUrl: p.linkProject,
      isPrivate: p.isPrivat
    }))
  },
  null,
  2
);

const generateExperienceCode = (): string => {
  return experienceData.map(exp => `## ${exp.title} (${exp.time})
**Role:** ${exp.status}

${exp.description}

${exp.projects ? `### Key Client Projects:
${exp.projects.map(p => `- **${p.name}** (${p.client}) — *${p.role}* [${p.time}]`).join('\n')}` : ''}
`).join('\n---\n\n');
};

const generateEducationCode = (): string => JSON.stringify(
  {
    academicTimeline: educationData.map(edu => ({
      institution: edu.title,
      program: edu.status,
      period: edu.time,
      description: edu.description
    }))
  },
  null,
  2
);

const generateContactCode = (): string => `# Farhan Aditya Contact Configuration
DEVELOPER_NAME="Farhan Aditya"
EMAIL="${contactData.find(c => c.link.startsWith('mailto:'))?.name || 'farhanaditya134@gmail.com'}"
LINKEDIN="https://www.linkedin.com/in/farhanadityaa/"
GITHUB="https://github.com/AugeusAune"
WHATSAPP="https://wa.me/6285920754983"

# Interactive Message Dispatcher:
# You can fill the form in Preview mode or run \`contact\` in the terminal!
`;

export const VFS_FILES: VFSFile[] = [
  {
    id: 'README.md',
    name: 'README.md',
    folder: 'src',
    path: 'portfolio > src > README.md',
    icon: 'vscode-icons:file-type-markdown',
    language: 'markdown',
    codeContent: generateReadmeCode(),
    previewComponent: 'ReadmePreview',
    description: 'Welcome overview, bio, and quick start guide'
  },
  {
    id: 'AboutMe.vue',
    name: 'AboutMe.vue',
    folder: 'src',
    path: 'portfolio > src > AboutMe.vue',
    icon: 'vscode-icons:file-type-vue',
    language: 'vue',
    codeContent: generateAboutCode(),
    previewComponent: 'AboutPreview',
    description: 'Personal background, engineering philosophy, and bio'
  },
  {
    id: 'Skills.ts',
    name: 'Skills.ts',
    folder: 'src',
    path: 'portfolio > src > Skills.ts',
    icon: 'vscode-icons:file-type-typescript',
    language: 'typescript',
    codeContent: generateSkillsCode(),
    previewComponent: 'SkillsPreview',
    description: 'Technical stack, languages, tools, and databases'
  },
  {
    id: 'Projects.json',
    name: 'Projects.json',
    folder: 'src',
    path: 'portfolio > src > Projects.json',
    icon: 'vscode-icons:file-type-json',
    language: 'json',
    codeContent: generateProjectsCode(),
    previewComponent: 'ProjectsPreview',
    description: 'Showcase of enterprise and personal applications'
  },
  {
    id: 'Experience.md',
    name: 'Experience.md',
    folder: 'docs',
    path: 'portfolio > docs > Experience.md',
    icon: 'vscode-icons:file-type-markdown',
    language: 'markdown',
    codeContent: generateExperienceCode(),
    previewComponent: 'ExperiencePreview',
    description: 'Professional career history and achievements'
  },
  {
    id: 'Education.json',
    name: 'Education.json',
    folder: 'docs',
    path: 'portfolio > docs > Education.json',
    icon: 'vscode-icons:file-type-json',
    language: 'json',
    codeContent: generateEducationCode(),
    previewComponent: 'EducationPreview',
    description: 'Academic background and certifications'
  },
  {
    id: 'Contact.env',
    name: 'Contact.env',
    folder: 'config',
    path: 'portfolio > config > Contact.env',
    icon: 'vscode-icons:file-type-dotenv',
    language: 'dotenv',
    codeContent: generateContactCode(),
    previewComponent: 'ContactPreview',
    description: 'Direct contact info, social handles, and message sender'
  }
];

export const getFileById = (id: string): VFSFile => {
  const file = VFS_FILES.find(f => f.id === id);
  if (file) return file;
  const fallback = VFS_FILES.find(f => f.id === 'README.md');
  if (!fallback) throw new Error('Root README.md not found in VFS');
  return fallback;
};

export const getFilesByFolder = (folder: 'src' | 'docs' | 'config'): VFSFile[] => {
  return VFS_FILES.filter(f => f.folder === folder);
};
