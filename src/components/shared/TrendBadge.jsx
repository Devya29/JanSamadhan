import { TrendingUp, ArrowRight, TrendingDown } from "lucide-react";


const icons = {
  Increasing: TrendingUp,
  Stable: ArrowRight,
  Decreasing: TrendingDown
};
const classes = {
  Increasing: "trend-increasing",
  Stable: "trend-stable",
  Decreasing: "trend-decreasing"
};

export default function TrendBadge({ trend }) {
  const Icon = icons[trend];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium font-mono-civic ${classes[trend]}`}>
      <Icon size={12} /> {trend}
    </span>);

}