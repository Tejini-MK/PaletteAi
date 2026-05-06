import React, { createContext, useContext, useState, useEffect } from 'react';
import { AIDetailedTheme, Gradient } from '../types';
import { AIColorSet } from '../services/aiService';

interface ColorSet extends AIColorSet {
  id: string;
}

interface DesignDataContextType {
  savedThemes: AIDetailedTheme[];
  likedGradients: Gradient[];
  savedPairs: ColorSet[];
  saveTheme: (theme: AIDetailedTheme) => void;
  deleteTheme: (title: string) => void;
  likeGradient: (gradient: Gradient) => void;
  unlikeGradient: (name: string) => void;
  savePair: (pair: ColorSet) => void;
  deletePair: (id: string) => void;
  isThemeSaved: (title: string) => boolean;
  isGradientLiked: (name: string) => boolean;
  isPairSaved: (id: string) => boolean;
  analyzedImagesCount: number;
  auditScore: number;
  activity7: number[];
  activity30: number[];
  setAnalyzedImagesCount: (count: number) => void;
  setAuditScore: (score: number) => void;
  setActivity7: (activity: number[]) => void;
  setActivity30: (activity: number[]) => void;
  resetUsageActivity: (period: '7' | '30') => void;
}

const DesignDataContext = createContext<DesignDataContextType | undefined>(undefined);

export function DesignDataProvider({ children }: { children: React.ReactNode }) {
  const [savedThemes, setSavedThemes] = useState<AIDetailedTheme[]>([]);
  const [likedGradients, setLikedGradients] = useState<Gradient[]>([]);
  const [savedPairs, setSavedPairs] = useState<ColorSet[]>([]);
  const [analyzedImagesCount, setAnalyzedImagesCount] = useState<number>(0);
  const [auditScore, setAuditScore] = useState<number>(0);
  const [activity7, setActivity7] = useState<number[]>(() => {
    const stored = localStorage.getItem('paletteai_activity_7');
    return stored ? JSON.parse(stored) : new Array(7).fill(0);
  });
  const [activity30, setActivity30] = useState<number[]>(() => {
    const stored = localStorage.getItem('paletteai_activity_30');
    return stored ? JSON.parse(stored) : new Array(30).fill(0);
  });

  // Load from localStorage
  useEffect(() => {
    const storedThemes = localStorage.getItem('paletteai_themes');
    const storedGradients = localStorage.getItem('paletteai_gradients');
    const storedPairs = localStorage.getItem('paletteai_pairs');
    const storedAnalyzedImages = localStorage.getItem('paletteai_analyzed_images');
    const storedAuditScore = localStorage.getItem('paletteai_audit_score');
    const storedActivity7 = localStorage.getItem('paletteai_activity_7');
    const storedActivity30 = localStorage.getItem('paletteai_activity_30');
    
    if (storedThemes) setSavedThemes(JSON.parse(storedThemes));
    if (storedGradients) setLikedGradients(JSON.parse(storedGradients));
    if (storedPairs) setSavedPairs(JSON.parse(storedPairs));
    if (storedAnalyzedImages) setAnalyzedImagesCount(JSON.parse(storedAnalyzedImages));
    if (storedAuditScore) setAuditScore(JSON.parse(storedAuditScore));
    if (storedActivity7) setActivity7(JSON.parse(storedActivity7));
    if (storedActivity30) setActivity30(JSON.parse(storedActivity30));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('paletteai_themes', JSON.stringify(savedThemes));
  }, [savedThemes]);

  useEffect(() => {
    localStorage.setItem('paletteai_gradients', JSON.stringify(likedGradients));
  }, [likedGradients]);

  useEffect(() => {
    localStorage.setItem('paletteai_pairs', JSON.stringify(savedPairs));
  }, [savedPairs]);

  useEffect(() => {
    localStorage.setItem('paletteai_analyzed_images', JSON.stringify(analyzedImagesCount));
  }, [analyzedImagesCount]);

  useEffect(() => {
    localStorage.setItem('paletteai_audit_score', JSON.stringify(auditScore));
  }, [auditScore]);

  useEffect(() => {
    localStorage.setItem('paletteai_activity_7', JSON.stringify(activity7));
  }, [activity7]);

  useEffect(() => {
    localStorage.setItem('paletteai_activity_30', JSON.stringify(activity30));
  }, [activity30]);

  const saveTheme = (theme: AIDetailedTheme) => {
    setSavedThemes(prev => {
      if (prev.some(t => t.title === theme.title)) return prev;
      return [...prev, theme];
    });
  };

  const deleteTheme = (title: string) => {
    setSavedThemes(prev => prev.filter(t => t.title !== title));
  };

  const likeGradient = (gradient: Gradient) => {
    setLikedGradients(prev => {
      if (prev.some(g => g.name === gradient.name)) return prev;
      return [...prev, gradient];
    });
  };

  const unlikeGradient = (name: string) => {
    setLikedGradients(prev => prev.filter(g => g.name !== name));
  };

  const savePair = (pair: ColorSet) => {
    setSavedPairs(prev => {
      if (prev.some(p => p.id === pair.id)) return prev;
      return [...prev, pair];
    });
  };

  const deletePair = (id: string) => {
    setSavedPairs(prev => prev.filter(p => p.id !== id));
  };

  const resetUsageActivity = (period: '7' | '30') => {
    if (period === '7') {
      const defaultActivity7 = [40, 65, 30, 85, 45, 95, 70];
      setActivity7(defaultActivity7);
      localStorage.removeItem('paletteai_activity_7');
    } else {
      const defaultActivity30 = [40, 65, 30, 85, 45, 95, 70, 55, 80, 60, 40, 75, 50, 90, 45, 65, 30, 85, 45, 95, 70, 55, 80, 60, 40, 75, 50, 90, 45, 65];
      setActivity30(defaultActivity30);
      localStorage.removeItem('paletteai_activity_30');
    }
  };

  const isThemeSaved = (title: string) => savedThemes.some(t => t.title === title);
  const isGradientLiked = (name: string) => likedGradients.some(g => g.name === name);
  const isPairSaved = (id: string) => savedPairs.some(p => p.id === id);

  return (
    <DesignDataContext.Provider value={{
      savedThemes,
      likedGradients,
      savedPairs,
      saveTheme,
      deleteTheme,
      likeGradient,
      unlikeGradient,
      savePair,
      deletePair,
      isThemeSaved,
      isGradientLiked,
      isPairSaved,
      analyzedImagesCount,
      auditScore,
      activity7,
      activity30,
      setAnalyzedImagesCount,
      setAuditScore,
      setActivity7,
      setActivity30,
      resetUsageActivity
    }}>
      {children}
    </DesignDataContext.Provider>
  );
}

export function useDesignData() {
  const context = useContext(DesignDataContext);
  if (context === undefined) {
    throw new Error('useDesignData must be used within a DesignDataProvider');
  }
  return context;
}
