import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, AlertTriangle } from "lucide-react";
import { getResolvedIssues } from "@/services/issueService";
import EmptyState from "@/components/shared/EmptyState";

const filters = ["Recently Resolved", "Citizen Verified", "Awaiting Verification", "Reopened / Needs Review"];

export default function ResolvedIssues() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Recently Resolved");
  const issues = getResolvedIssues();

  const filtered = issues.filter((i) => {
    if (filter === "Citizen Verified") return i.citizenVerificationStatus === "VERIFIED";
    if (filter === "Awaiting Verification") return i.citizenVerificationStatus === "PENDING";
    if (filter === "Reopened / Needs Review") return i.citizenVerificationStatus === "REOPENED";
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Resolved Issues</h1>
      <p className="text-muted-foreground text-sm mb-5">Issues that have been marked resolved by authorities.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((f) =>
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
          filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-accent"}`
          }>
          
            {f}
          </button>
        )}
      </div>

      {filtered.length === 0 ?
      <EmptyState title="No resolved issues" message="No issues match this filter." /> :

      <div className="flex flex-col gap-3">
          {filtered.map((issue) =>
        <div
          key={issue.id}
          className="bg-card border border-border rounded-md p-4 cursor-pointer hover:border-accent hover:shadow-sm"
          onClick={() => navigate(`/authority/issues/${issue.id}`)}>
          
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono-civic text-accent">{issue.id}</span>
                    <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded font-mono-civic">Resolved</span>
                    {issue.citizenVerificationStatus === "VERIFIED" &&
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-mono-civic inline-flex items-center gap-1"><Check size={11} /> Citizen Verified</span>
                }
                    {issue.citizenVerificationStatus === "REOPENED" &&
                <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded font-mono-civic inline-flex items-center gap-1"><AlertTriangle size={11} /> Reopened</span>
                }
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{issue.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{issue.area} · {issue.complaintCount} complaints</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground font-mono-civic">
                    {issue.resolvedAt && <span>Resolved: {new Date(issue.resolvedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
                    <span>Dept: {issue.assignedDepartment ?? "—"}</span>
                  </div>
                  {issue.resolutionNote &&
              <p className="text-xs text-muted-foreground mt-2 italic">"{issue.resolutionNote}"</p>
              }
                </div>
              </div>
            </div>
        )}
        </div>
      }
    </div>);

}