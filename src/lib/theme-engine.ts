export function injectPreviewTheme(colors: { primary: string; secondary: string; accent: string; background?: string; surface?: string; gradients?: string[] }) {
  const root = document.documentElement;
  
  root.style.setProperty('--preview-primary', colors.primary);
  root.style.setProperty('--preview-secondary', colors.secondary);
  root.style.setProperty('--preview-accent', colors.accent);
  
  if (colors.background) {
    root.style.setProperty('--preview-bg', colors.background);
  } else {
    root.style.setProperty('--preview-bg', 'var(--bg-app)');
  }

  if (colors.surface) {
    root.style.setProperty('--preview-surface', colors.surface);
  } else {
    root.style.setProperty('--preview-surface', 'var(--bg-surface)');
  }
  
  if (colors.gradients && colors.gradients.length > 0) {
    const gradientString = colors.gradients.length === 1 
      ? `linear-gradient(135deg, ${colors.gradients[0]}, ${colors.primary})`
      : `linear-gradient(135deg, ${colors.gradients.join(', ')})`;
    root.style.setProperty('--preview-gradient', gradientString);
  } else {
    root.style.setProperty('--preview-gradient', `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`);
  }
}

export function generateExportCode(type: 'tailwind' | 'css' | 'flutter' | 'json', colors: any) {
  switch (type) {
    case 'tailwind':
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: '${colors.primary}',\n        secondary: '${colors.secondary}',\n        accent: '${colors.accent}',\n      }\n    }\n  }\n}`;
    case 'css':
      return `:root {\n  --primary: ${colors.primary};\n  --secondary: ${colors.secondary};\n  --accent: ${colors.accent};\n}`;
    case 'flutter':
      return `static const primaryColor = Color(0xFF${colors.primary.replace('#', '')});\nstatic const secondaryColor = Color(0xFF${colors.secondary.replace('#', '')});\nstatic const accentColor = Color(0xFF${colors.accent.replace('#', '')});`;
    case 'json':
      return JSON.stringify(colors, null, 2);
    default:
      return '';
  }
}
