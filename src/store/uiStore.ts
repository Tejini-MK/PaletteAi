import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIDetailedTheme } from '../types';

export type ColorBlindnessMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface UIState {
  // Accessibility & Filters
  colorBlindnessMode: ColorBlindnessMode;
  showAccessibilityPanel: boolean;
  setColorBlindnessMode: (mode: ColorBlindnessMode) => void;
  toggleAccessibilityPanel: () => void;

  // History System
  history: AIDetailedTheme[];
  addToHistory: (set: AIDetailedTheme) => void;
  clearHistory: () => void;

  // Premium UI Settings
  showMeshBackground: boolean;
  toggleMeshBackground: () => void;
  
  // Active Theme Context
  activeSuggestions: string[];
  setActiveSuggestions: (suggestions: string[]) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      colorBlindnessMode: 'none',
      showAccessibilityPanel: false,
      setColorBlindnessMode: (mode) => set({ colorBlindnessMode: mode }),
      toggleAccessibilityPanel: () => set((state) => ({ showAccessibilityPanel: !state.showAccessibilityPanel })),

      history: [],
      addToHistory: (newSet) => set((state) => {
        const exists = state.history.some(s => s.name === newSet.name);
        if (exists) return state;
        // Keep last 20 palettes
        const newHistory = [newSet, ...state.history].slice(0, 20);
        return { history: newHistory };
      }),
      clearHistory: () => set({ history: [] }),

      showMeshBackground: true,
      toggleMeshBackground: () => set((state) => ({ showMeshBackground: !state.showMeshBackground })),

      activeSuggestions: [],
      setActiveSuggestions: (suggestions) => set({ activeSuggestions: suggestions }),
    }),
    {
      name: 'palette-ai-ui-storage',
      partialize: (state) => ({ history: state.history, showMeshBackground: state.showMeshBackground }),
    }
  )
);
