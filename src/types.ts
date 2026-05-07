export type AppMode = 'Landing' | 'Dashboard' | 'Theme Generator' | 'Gradient AI' | 'Image Palette' | 'Brand DNA' | 'Settings';

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  background: string;
  onSurface: string;
  onPrimary: string;
  primaryContainer: string;
}

export interface Gradient {
  name: string;
  colors: string[];
}

export interface AIDetailedTheme {
  title: string;
  description: string;
  recommendedMode?: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
  rationale: string;
  usage: {
    headings: string;
    body: string;
    buttons: string;
    cards: string;
  };
  designInsights: string[];
}
