/**
 * Palette AI Accessibility Engine
 * Handles WCAG 2.1 contrast math and color adjustments
 */

export interface ContrastResult {
  ratio: number;
  score: 'FAIL' | 'AA' | 'AAA';
  readable: boolean;
}

/**
 * Converts hex color to RGB
 */
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculates relative luminance for a color
 * Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates contrast ratio between two colors
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validates WCAG score based on ratio
 */
export function getWCAGScore(ratio: number, isLargeText: boolean = false): ContrastResult {
  const aa = isLargeText ? 3 : 4.5;
  const aaa = isLargeText ? 4.5 : 7;

  let score: 'FAIL' | 'AA' | 'AAA' = 'FAIL';
  if (ratio >= aaa) score = 'AAA';
  else if (ratio >= aa) score = 'AA';

  return {
    ratio: parseFloat(ratio.toFixed(2)),
    score,
    readable: ratio >= aa
  };
}

/**
 * AI Accessibility Fixer Logic
 * Intelligently shifts color brightness to meet WCAG AA
 */
export function autoFixContrast(foreground: string, background: string): string {
  const ratio = getContrastRatio(foreground, background);
  if (ratio >= 4.5) return foreground;

  // Simple implementation: shift foreground towards white or black
  const lFg = getRelativeLuminance(foreground);
  const lBg = getRelativeLuminance(background);

  // If background is dark, brighten foreground. If light, darken foreground.
  const isBgDark = lBg < 0.5;
  
  // This is a placeholder for a more complex color shift
  // In a real app, we might iterate through lightness levels
  return isBgDark ? "#ffffff" : "#000000";
}

/**
 * Calculate overall accessibility percentage for a set of colors
 */
export function calculateAccessibilityGrade(colors: string[]): number {
  if (colors.length < 2) return 100;
  
  let passes = 0;
  let total = 0;

  // Check contrast of every color against the background (assumed to be index 0 or similar)
  const bg = colors[colors.length - 1]; // Use last color as surface/bg for calculation
  
  colors.slice(0, -1).forEach(color => {
    const ratio = getContrastRatio(color, bg);
    if (ratio >= 4.5) passes++;
    total++;
  });

  return Math.round((passes / total) * 100);
}
