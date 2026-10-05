import { TrendingUp, ArrowRight as TrendStable, TrendingDown } from "lucide-react";
import {
  complaintsOverTime,
  issuesByCategory,
  issuesByLocality,
  priorityDistribution,
  activeVsResolved,
  trendData } from
"@/data/mockAnalytics";

function Bar({ value, max, color }) {
  return (
    <div className="flex-1 bg-muted rounded-sm overflow-hidden h-full">
      <div className="h-full rounded-sm transition-all" style={{ width: `${value / max * 100}%`, backgroundColor: color }} />
    </div>);

}

export default function Analytics() {
  const maxComplaints = Math.max(...complaintsOverTime.map((d) => d.count));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Analytics</h1>
      <p className="text-muted-foreground text-sm mb-7">Civic issue and complaint trends for Arera Colony, Bhopal.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Complaints over time */}
        <div className="bg-card border border-border rounded-md p-5">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Complaints Over Time (Sep 2026)</h2>
          <div className="flex items-end gap-1 h-32">
            {complaintsOverTime.map((d) =>
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t" style={{ height: `${d.count / maxComplaints * 100}%`, backgroundColor: "#0D9488", minHeight: "4px" }} />
                <span className="text-[9px] text-muted-foreground font-mono-civic rotate-45 origin-left mt-1 hidden sm:block">{d.date.replace("Sep ", "")}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Sep 1</span><span>Sep 14</span>
          </div>
        </div>

        {/* Priority distribution */}
        <div className="bg-card border border-border rounded-md p-5">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Priority Distribution</h2>
          <div className="flex flex-col gap-3">
            {priorityDistribution.map((p) => {
              const total = priorityDistribution.reduce((s, x) => s + x.count, 0);
              return (
                <div key={p.priority} className="flex items-center gap-3">
                  <span className="text-xs font-mono-civic w-16" style={{ color: p.color }}>{p.priority}</span>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div className="h-3 rounded-full" style={{ width: `${p.count / total * 100}%`, backgroundColor: p.color }} />
                  </div>
                  <span className="text-xs font-mono-civic text-muted-foreground w-6 text-right">{p.count}</span>
                </div>);

            })}
          </div>

          <div className="mt-5">
            <h3 className="text-xs font-medium text-muted-foreground mb-3">Active vs Resolved</h3>
            <div className="flex gap-3">
              {activeVsResolved.map((s) =>
              <div key={s.name} className="flex-1 bg-secondary rounded-md p-3 text-center">
                  <div className="font-display text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.name}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Issues by category */}
        <div className="bg-card border border-border rounded-md p-5">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Issues by Category</h2>
          <div className="flex flex-col gap-2">
            {issuesByCategory.sort((a, b) => b.count - a.count).map((d) =>
            <div key={d.category} className="flex items-center gap-3">
                <span className="text-xs text-foreground w-28 flex-shrink-0 truncate">{d.category}</span>
                <div className="flex-1 bg-muted rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-navy" style={{ width: `${d.count / Math.max(...issuesByCategory.map((x) => x.count)) * 100}%` }} />
                </div>
                <span className="text-xs font-mono-civic text-muted-foreground w-4 text-right">{d.count}</span>
              </div>
            )}
          </div>
        </div>

        {/* Issues by locality */}
        <div className="bg-card border border-border rounded-md p-5">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Issues by Locality</h2>
          <div className="flex flex-col gap-2">
            {issuesByLocality.sort((a, b) => b.count - a.count).map((d) =>
            <div key={d.area} className="flex items-center gap-3">
                <span className="text-xs text-foreground w-28 flex-shrink-0">{d.area}</span>
                <div className="flex-1 bg-muted rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-teal" style={{ width: `${d.count / Math.max(...issuesByLocality.map((x) => x.count)) * 100}%` }} />
                </div>
                <span className="text-xs font-mono-civic text-muted-foreground w-4 text-right">{d.count}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trend table */}
      <div className="bg-card border border-border rounded-md p-5">
        <h2 className="font-display text-base font-semibold text-foreground mb-4">Increasing Issue Trends</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs text-muted-foreground font-medium pb-2">Area</th>
                <th className="text-left text-xs text-muted-foreground font-medium pb-2">Issue</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-2">Complaints</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((row, i) =>
              <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-2 text-xs text-muted-foreground">{row.area}</td>
                  <td className="py-2 text-xs text-foreground font-medium">{row.issue}</td>
                  <td className="py-2 text-xs text-right font-mono-civic">{row.complaints}</td>
                  <td className={`py-2 text-xs text-right font-mono-civic ${row.trend === "Increasing" ? "trend-increasing" : row.trend === "Stable" ? "trend-stable" : "trend-decreasing"}`}>
                    <span className="inline-flex items-center gap-1 justify-end w-full">
                      {row.trend === "Increasing" ? <TrendingUp size={12} /> : row.trend === "Stable" ? <TrendStable size={12} /> : <TrendingDown size={12} />}
                      {row.trend}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}