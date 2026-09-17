// Client-safe port of accent-scale.js's pure math. No Node dependencies
// (no module.exports, no require.main check), so this runs directly in the
// browser as someone drags the color picker.
//
// One deliberate behavior change from the original: that version threw on
// a monotonicity failure (a color too light or dark to sit at step 500
// without breaking the ladder's order). Per the decision this session, the
// live preview itself is the safety mechanism now, a partner sees a weird
// result and picks a different color, so this version always produces a
// scale, even an unusual-looking one for extreme inputs, rather than
// refusing outright.

export type AccentStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export interface GeneratedAccentScale {
  steps: Record<AccentStep, string>;
  alphas: {
    "alpha-subtle": string;
    "alpha-default": string;
    "alpha-strong": string;
    "alpha-stronger": string;
  };
  textPairings: Record<AccentStep, string | null>;
}

function srgbToLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function linearToSrgb(c: number) {
  c = Math.max(0, Math.min(1, c));
  return c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
}
function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.slice(0, 2), 16) / 255,
    g: parseInt(hex.slice(2, 4), 16) / 255,
    b: parseInt(hex.slice(4, 6), 16) / 255,
  };
}
function rgbToHex(r: number, g: number, b: number) {
  const to255 = (c: number) => Math.round(linearToSrgb(c) * 255);
  const toHex = (c: number) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(to255(r))}${toHex(to255(g))}${toHex(to255(b))}`;
}
function hexToOklch(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const [rl, gl, bl] = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;
  const [l_, m_, s_] = [Math.cbrt(l), Math.cbrt(m), Math.cbrt(s)];
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + bb * bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}
function oklchToLinearRgb(L: number, C: number, H: number) {
  const Hr = (H * Math.PI) / 180;
  const a = C * Math.cos(Hr);
  const b = C * Math.sin(Hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const [l, m, s] = [l_ ** 3, m_ ** 3, s_ ** 3];
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}
function inGamut(L: number, C: number, H: number, eps = 1e-4) {
  const { r, g, b } = oklchToLinearRgb(L, C, H);
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps;
}
function maxChroma(L: number, H: number, hi = 0.4) {
  if (!inGamut(L, 0, H)) return 0;
  let lo = 0;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(L, mid, H)) lo = mid;
    else hi = mid;
  }
  return lo;
}
function oklchToHex(L: number, C: number, H: number) {
  const { r, g, b } = oklchToLinearRgb(L, C, H);
  return rgbToHex(r, g, b);
}
function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const [rl, gl, bl] = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}
function contrastRatio(hexA: string, hexB: string) {
  const [l1, l2] = [relativeLuminance(hexA), relativeLuminance(hexB)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}
function pickTextColor(bgHex: string) {
  const white = contrastRatio(bgHex, "#FFFFFF");
  const black = contrastRatio(bgHex, "#000000");
  if (white < 4.5 && black < 4.5) return null;
  return white >= black ? "#FFFFFF" : "#000000";
}

const STEPS: AccentStep[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const REFERENCE_L: Record<AccentStep, number> = {
  50: 0.975, 100: 0.945, 200: 0.895, 300: 0.825, 400: 0.735,
  500: 0.638, 600: 0.565, 700: 0.475, 800: 0.385, 900: 0.305, 950: 0.225,
};

export function generateAccentScale(inputHex: string): GeneratedAccentScale {
  const { L: L0, C: C0, H: H0 } = hexToOklch(inputHex);
  const anchorStep: AccentStep = 500;

  // No monotonicity throw here, unlike the server-side version. An extreme
  // input just produces a scale where step 500 sits at an unusual lightness
  // relative to its neighbors, visible in the preview immediately, that
  // visibility is the safety mechanism now.
  const lightness = { ...REFERENCE_L, [anchorStep]: L0 };

  const steps = {} as Record<AccentStep, string>;
  const textPairings = {} as Record<AccentStep, string | null>;

  for (const step of STEPS) {
    const L = lightness[step];
    let desiredC: number;
    if (step === anchorStep) {
      desiredC = C0;
    } else {
      const distance = Math.abs(L - L0);
      desiredC = C0 * Math.max(0, 1 - distance * 2.2);
    }
    const gamutMax = maxChroma(L, H0);
    const useC = step === anchorStep ? C0 : Math.min(desiredC, gamutMax * 0.94);
    const hex = oklchToHex(L, useC, H0);
    steps[step] = hex;
    textPairings[step] = pickTextColor(hex);
  }

  const base500 = hexToRgb(steps[500]);
  const toRgbStr = (r: number, g: number, b: number) => `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
  const alphas = {
    "alpha-subtle": `rgba(${toRgbStr(base500.r, base500.g, base500.b)}, 0.08)`,
    "alpha-default": `rgba(${toRgbStr(base500.r, base500.g, base500.b)}, 0.16)`,
    "alpha-strong": `rgba(${toRgbStr(base500.r, base500.g, base500.b)}, 0.32)`,
    "alpha-stronger": `rgba(${toRgbStr(base500.r, base500.g, base500.b)}, 0.64)`,
  };

  return { steps, alphas, textPairings };
}

// Converts a generated scale into the exact 15 CSS custom properties every
// semantic accent token already chains through, --theme-theme-50 through
// 950 plus the 4 alphas, ready to spread directly into a React style prop.
export function accentScaleToCssVars(scale: GeneratedAccentScale): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const step of STEPS) {
    vars[`--theme-theme-${step}`] = scale.steps[step];
  }
  for (const [name, value] of Object.entries(scale.alphas)) {
    vars[`--theme-theme-${name}`] = value;
  }
  return vars;
}