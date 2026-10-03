import { VFS_FILES, getFileById } from './vfs';
import { THEMES, type ThemeId } from './themes';
import skillsData from '../list/skils.js';
import projectsData from '../list/project.js';
import contactData from '../list/list-contact.js';

export interface TerminalResult {
  output: string;
  type: 'normal' | 'success' | 'error' | 'clear';
  action?: string;
  payload?: any;
}

const getHelpOutput = (): string => {
  return [
    'Available commands:',
    '  help                 Show this list of commands',
    '  ls                   List virtual files in current directory',
    '  open <filename>      Open specified file in the editor',
    '  cat <filename>       Print file contents to the terminal',
    '  skills               Display technical stack & competencies',
    '  projects             List featured engineering projects',
    '  contact              Display email, WhatsApp, and social profiles',
    '  theme <name>         Switch IDE theme (dark-plus, one-dark-pro, tokyo-night, dracula, light-plus)',
    '  whoami               Display author information',
    '  clear                Clear the terminal screen',
    '  sudo rm -rf /        (Try at your own risk)'
  ].join('\n');
};

const getLsOutput = (): string => {
  return VFS_FILES.map(f => `  [${f.folder}] ${f.name} (${f.language})`).join('\n');
};

const handleCatOrOpen = (cmd: string, arg?: string): TerminalResult => {
  if (!arg) {
    return { output: `Usage: ${cmd} <filename>`, type: 'error' };
  }
  const file = VFS_FILES.find(f => f.name.toLowerCase() === arg.toLowerCase() || f.id.toLowerCase() === arg.toLowerCase());
  if (!file) {
    return { output: `File not found: ${arg}. Type "ls" to list files.`, type: 'error' };
  }
  if (cmd === 'open') {
    return {
      output: `Opened ${file.name} in editor.`,
      type: 'success',
      action: 'openFile',
      payload: file.id
    };
  }
  return { output: file.codeContent, type: 'normal' };
};

const handleThemeCommand = (themeName?: string): TerminalResult => {
  if (!themeName) {
    const list = Object.keys(THEMES).join(', ');
    return { output: `Usage: theme <name>\nAvailable themes: ${list}`, type: 'error' };
  }
  const normalized = themeName.toLowerCase() as ThemeId;
  if (!THEMES[normalized]) {
    return {
      output: `Unknown theme "${themeName}". Available: ${Object.keys(THEMES).join(', ')}`,
      type: 'error'
    };
  }
  return {
    output: `Switched theme to "${THEMES[normalized].name}".`,
    type: 'success',
    action: 'setTheme',
    payload: normalized
  };
};

const getSkillsOutput = (): string => {
  return [
    '=== Technical Stack ===',
    ...skillsData.map(s => `• ${s.name.padEnd(16)} - ${s.text}`)
  ].join('\n');
};

const getProjectsOutput = (): string => {
  return [
    '=== Featured Projects ===',
    ...projectsData.map((p, idx) => `${idx + 1}. ${p.title}\n   Link: ${p.linkProject || 'Private Enterprise'}`)
  ].join('\n');
};

const getContactOutput = (): string => {
  return [
    '=== Contact Channels ===',
    ...contactData.map(c => `• ${c.name.padEnd(28)} -> ${c.link}`)
  ].join('\n');
};

export const executeCommand = (
  rawInput: string,
  onAction?: (action: string, payload?: any) => void
): TerminalResult => {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: '', type: 'normal' };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const arg = parts[1];

  let result: TerminalResult;

  switch (command) {
    case 'help':
      result = { output: getHelpOutput(), type: 'normal' };
      break;
    case 'ls':
    case 'dir':
      result = { output: getLsOutput(), type: 'normal' };
      break;
    case 'cat':
    case 'open':
      result = handleCatOrOpen(command, arg);
      break;
    case 'skills':
      result = { output: getSkillsOutput(), type: 'normal' };
      break;
    case 'projects':
      result = { output: getProjectsOutput(), type: 'normal' };
      break;
    case 'contact':
      result = { output: getContactOutput(), type: 'normal' };
      break;
    case 'theme':
      result = handleThemeCommand(arg);
      break;
    case 'whoami':
      result = {
        output: 'Farhan Aditya - Full Stack Developer & Software Engineer (Jakarta, Indonesia)',
        type: 'success'
      };
      break;
    case 'clear':
      result = { output: '', type: 'clear' };
      break;
    case 'sudo':
      result = {
        output: 'Permission denied: Nice try! You do not have root access on this portfolio 😉',
        type: 'error'
      };
      break;
    default:
      result = {
        output: `Command not found: "${command}". Type "help" for a list of available commands.`,
        type: 'error'
      };
  }

  if (result.action && onAction) {
    onAction(result.action, result.payload);
  }

  return result;
};
