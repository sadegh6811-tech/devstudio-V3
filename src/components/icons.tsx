import {
  BrainCircuit,
  Building2,
  Code2,
  Gauge,
  Globe2,
  GraduationCap,
  HeartPulse,
  Landmark,
  LineChart,
  MessageSquare,
  Plane,
  ScanEye,
  ShoppingBag,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  python: Code2,
  mobile: Smartphone,
  web: Globe2,
  ai: BrainCircuit,
  landmark: Landmark,
  "heart-pulse": HeartPulse,
  "brain-circuit": BrainCircuit,
  workflow: Workflow,
  "shopping-bag": ShoppingBag,
  "graduation-cap": GraduationCap,
  "scan-eye": ScanEye,
  "line-chart": LineChart,
  plane: Plane,
  gauge: Gauge,
  "message-square": MessageSquare,
  building: Building2,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Code2;
}

export { ICONS };
