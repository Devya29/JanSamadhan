// "Modern Indian Civic Technology" palette — see final visual direction doc.
// Rule: saffron/mustard/coral/green/blue are used selectively (icons, small
// accents, status), never as full-section background fills.
export const INK = "#0F172A"; // slate-900, primary text
export const INK_SOFT = "#64748B"; // slate-500, secondary/muted text
export const PAPER = "#F8FAFC"; // slate-50 page background
export const SURFACE = "#FFFFFF"; // card surface
export const BORDER = "#E2E8F0"; // slate-200 thin borders

export const SAFFRON = "#F97316"; // primary accent / CTA (orange-500)
export const SAFFRON_SOFT = "#FFEDD5";
export const GREEN = "#1D7A4C"; // resolved / positive
export const GREEN_SOFT = "#E1F0E6";
export const CORAL = "#D9432E"; // urgent / high priority
export const CORAL_SOFT = "#FBE1DD";
export const MUSTARD = "#CE9A22"; // attention / moderate priority
export const MUSTARD_SOFT = "#F8EFD8";
export const BLUE = "#2E6FA8"; // water / location only
export const BLUE_SOFT = "#E2EBF4";
export const TEAL = "#1E8A82"; // drainage
export const TEAL_SOFT = "#DFF0EE";
export const DARK = "#0F172A"; // slate-900, footer / dark sections

export const CATEGORY_COLORS = {
  "Water Supply": { color: BLUE, soft: BLUE_SOFT },
  "Waste Management": { color: GREEN, soft: GREEN_SOFT },
  "Roads & Potholes": { color: SAFFRON, soft: SAFFRON_SOFT },
  "Streetlights": { color: MUSTARD, soft: MUSTARD_SOFT },
  "Drainage": { color: TEAL, soft: TEAL_SOFT },
  "Public Infrastructure": { color: CORAL, soft: CORAL_SOFT }
};

export const PRIORITY_COLORS = {
  HIGH: CORAL,
  MEDIUM: MUSTARD,
  LOW: TEAL
};

export const STATUS_COLORS = {
  UNASSIGNED: { color: INK_SOFT, soft: "#E2E8F0" },
  ASSIGNED: { color: BLUE, soft: BLUE_SOFT },
  IN_PROGRESS: { color: MUSTARD, soft: MUSTARD_SOFT },
  UNDER_REVIEW: { color: BLUE, soft: BLUE_SOFT },
  RESOLVED: { color: GREEN, soft: GREEN_SOFT },
  NEEDS_REVIEW: { color: CORAL, soft: CORAL_SOFT }
};