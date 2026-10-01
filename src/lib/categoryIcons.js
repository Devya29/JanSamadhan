import { Droplets, Trash2, Construction, Lightbulb, Waves, AlertTriangle } from "lucide-react";

export const CATEGORY_ICONS = {
  "Water Supply": Droplets,
  "Waste / Garbage": Trash2,
  "Road / Pothole": Construction,
  "Streetlight": Lightbulb,
  "Drainage": Waves,
  "Other": AlertTriangle
};

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] ?? AlertTriangle;
}