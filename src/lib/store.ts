import { create } from 'zustand';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'light' | 'dark';
export type TemplateType = 'SaaS' | 'Dashboard' | 'Portfolio' | 'Ecommerce' | 'AI Startup';

interface PreviewTheme {
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  surface?: string;
  gradients?: string[];
}

interface PreviewState {
  isOpen: boolean;
  activeTheme: PreviewTheme | null;
  device: DeviceType;
  mode: ThemeMode;
  template: TemplateType;
  
  // Actions
  openPreview: (theme: PreviewTheme) => void;
  closePreview: () => void;
  setDevice: (device: DeviceType) => void;
  setMode: (mode: ThemeMode) => void;
  setTemplate: (template: TemplateType) => void;
  updateTheme: (theme: Partial<PreviewTheme>) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  isOpen: false,
  activeTheme: null,
  device: 'desktop',
  mode: 'dark',
  template: 'SaaS',

  openPreview: (theme) => set({ activeTheme: theme, isOpen: true }),
  closePreview: () => set({ isOpen: false }),
  setDevice: (device) => set({ device }),
  setMode: (mode) => set({ mode }),
  setTemplate: (template) => set({ template }),
  updateTheme: (theme) => set((state) => ({
    activeTheme: state.activeTheme ? { ...state.activeTheme, ...theme } : null
  })),
}));
