import { AIDetailedTheme } from '../types';

export interface DesignSystemTokens {
  spacing: Record<string, string>;
  typography: {
    fontFamily: string;
    scales: Record<string, string>;
    weights: Record<string, string>;
  };
  radii: Record<string, string>;
  shadows: Record<string, string>;
  semanticColors: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  componentTokens: {
    buttonRadius: string;
    cardPadding: string;
    inputHeight: string;
  };
}

export function generateDesignSystem(theme: AIDetailedTheme): DesignSystemTokens {
  // Logic to derive a full system from the primary/secondary colors
  const primary = theme.colors.primary;
  
  return {
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '4rem',
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      scales: {
        h1: '4.5rem',
        h2: '3rem',
        h3: '2.25rem',
        body: '1rem',
        small: '0.875rem',
      },
      weights: {
        normal: '400',
        medium: '500',
        bold: '700',
        black: '900',
      }
    },
    radii: {
      none: '0',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.15)',
      xl: '0 20px 25px rgba(0,0,0,0.2)',
    },
    semanticColors: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: primary,
    },
    componentTokens: {
      buttonRadius: '0.75rem',
      cardPadding: '2rem',
      inputHeight: '3.5rem',
    }
  };
}

export function injectDesignTokens(tokens: DesignSystemTokens) {
  const root = document.documentElement;
  
  // Inject Spacing
  Object.entries(tokens.spacing).forEach(([key, val]) => {
    root.style.setProperty(`--space-${key}`, val);
  });
  
  // Inject Typography
  Object.entries(tokens.typography.scales).forEach(([key, val]) => {
    root.style.setProperty(`--text-${key}`, val);
  });
  
  // Inject Radii
  Object.entries(tokens.radii).forEach(([key, val]) => {
    root.style.setProperty(`--radius-${key}`, val);
  });
  
  // Inject Shadows
  Object.entries(tokens.shadows).forEach(([key, val]) => {
    root.style.setProperty(`--shadow-${key}`, val);
  });
}
