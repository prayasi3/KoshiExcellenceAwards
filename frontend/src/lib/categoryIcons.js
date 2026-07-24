// src/lib/categoryIcons.js
//
// Maps an award category's name to a lucide-react icon that reflects its
// subject matter (e.g. "Agriculture" -> a sprout, "Banking" -> a landmark).
// Falls back to a generic trophy/award icon for anything unrecognised.

import {
  Award,
  Briefcase,
  Building2,
  Camera,
  Car,
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Heart,
  Hotel,
  Landmark,
  Leaf,
  Music,
  Newspaper,
  Palette,
  Plane,
  Rocket,
  Scale,
  Shield,
  ShoppingBag,
  Sprout,
  Store,
  BookOpen,
  TrendingUp,
  Trophy,
  Users,
  Utensils,
  Wrench,
  Zap,
} from "lucide-react";

// Order matters: the first matching rule wins, so more specific keywords
// should be listed before broader/overlapping ones.
const ICON_RULES = [
  { keywords: ["agricult", "farm", "livestock"], icon: Sprout },
  { keywords: ["automobile", "auto ", "vehicle", "motor"], icon: Car },
  { keywords: ["bank", "finance", "financial"], icon: Landmark },
  { keywords: ["insurance"], icon: Shield },
  { keywords: ["education", "academic", "school"], icon: GraduationCap },
  { keywords: ["entrepreneur", "startup", "innovation"], icon: Rocket },
  { keywords: ["health", "medical", "hospital", "wellness"], icon: HeartPulse },
  { keywords: ["literature", "writer", "author", "poet"], icon: BookOpen },
  { keywords: ["media", "journalism", "press", "broadcast"], icon: Newspaper },
  { keywords: ["sport", "athlet"], icon: Trophy },
  { keywords: ["technology", "tech", "software", "digital", "it "], icon: Cpu },
  { keywords: ["marketing", "brand", "advertis"], icon: TrendingUp },
  { keywords: ["real estate", "construction", "infrastructure"], icon: Building2 },
  { keywords: ["hospitality", "hotel", "tourism", "travel"], icon: Hotel },
  { keywords: ["social work", "social service", "community", "humanitarian"], icon: Handshake },
  { keywords: ["environment", "sustainab", "climate", "green"], icon: Leaf },
  { keywords: ["art", "culture", "craft"], icon: Palette },
  { keywords: ["music", "entertainment"], icon: Music },
  { keywords: ["photograph", "film", "cinema"], icon: Camera },
  { keywords: ["law", "legal", "justice"], icon: Scale },
  { keywords: ["women", "youth", "leadership"], icon: Users },
  { keywords: ["retail", "commerce", "trade"], icon: Store },
  { keywords: ["manufactur", "factory", "production", "industr"], icon: Factory },
  { keywords: ["food", "restaurant", "culinary"], icon: Utensils },
  { keywords: ["aviation", "airline", "transport"], icon: Plane },
  { keywords: ["energy", "power", "electric"], icon: Zap },
  { keywords: ["nonprofit", "charity", "volunt"], icon: Heart },
  { keywords: ["fashion", "apparel", "beauty"], icon: ShoppingBag },
  { keywords: ["engineer", "mechanic", "utilit"], icon: Wrench },
  { keywords: ["corporate", "business", "management"], icon: Briefcase },
  { keywords: ["global", "international", "diaspora"], icon: Globe },
];

export function getCategoryIcon(categoryName = "") {
  const name = categoryName.toLowerCase();
  const rule = ICON_RULES.find((entry) =>
    entry.keywords.some((keyword) => name.includes(keyword))
  );
  return rule ? rule.icon : Award;
}