
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import TrendBadge from "./TrendBadge";
import { getCategoryIcon } from "@/lib/categoryIcons";







export default function IssueCard({ issue, onClick, rank }) {
  const CategoryIcon = getCategoryIcon(issue.category);
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-xl p-5 ${onClick ? "cursor-pointer" : ""} transition-all`}>
      
      <div className="flex items-start gap-4">
        {rank !== undefined &&
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-bold font-mono-civic text-muted-foreground mt-0.5">
            {rank}
          </span>
        }
        <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-teal flex-shrink-0">
          <CategoryIcon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <PriorityBadge priority={issue.priority} />
            <StatusBadge status={issue.status} />
            <TrendBadge trend={issue.trend} />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight">{issue.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{issue.area} · {issue.category}</p>
          <div className="flex flex-wrap gap-5 mt-3 text-xs text-muted-foreground font-mono-civic">
            <span><strong className="text-foreground">{issue.complaintCount}</strong> complaints</span>
            <span><strong className="text-foreground">{issue.uniqueReporterCount}</strong> reporters</span>
            <span><strong className="text-foreground">{issue.duration}</strong> active</span>
            <span>Score <strong className="text-teal">{issue.priorityScore}</strong>/100</span>
          </div>
        </div>
      </div>
    </div>);

}