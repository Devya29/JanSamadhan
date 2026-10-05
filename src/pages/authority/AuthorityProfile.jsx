import { authorityUser } from "@/data/mockUsers";
import { getDashboardSummary } from "@/services/dashboardService";

export default function AuthorityProfile() {
  const summary = getDashboardSummary();
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Authority Profile</h1>
      <div className="bg-card border border-border rounded-md p-6 mb-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-xl font-display font-bold">
            {authorityUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">{authorityUser.name}</h2>
            <p className="text-sm text-muted-foreground">{authorityUser.role} · {authorityUser.department}</p>
          </div>
        </div>
        <div className="border-t border-border pt-4 space-y-3">
          {[
          { label: "Email", value: authorityUser.email },
          { label: "Department", value: authorityUser.department },
          { label: "Role", value: authorityUser.role },
          { label: "Assigned Locality", value: authorityUser.assignedLocality }].
          map(({ label, value }) =>
          <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-xs text-foreground font-medium">{value}</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
        { label: "Active Issues", value: summary.totalActiveIssues },
        { label: "High Priority", value: summary.highPriorityCount },
        { label: "Resolved", value: summary.resolvedCount }].
        map(({ label, value }) =>
        <div key={label} className="bg-card border border-border rounded-md p-4 text-center">
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        )}
      </div>
    </div>);

}