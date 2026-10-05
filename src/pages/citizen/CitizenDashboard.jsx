import { useNavigate } from "react-router-dom";
import { AlertTriangle, FileEdit, Sparkles, BarChart3, Landmark, CheckCircle2 } from "lucide-react";
import { getActiveIssues, getResolvedIssues } from "@/services/issueService";
import IssueCard from "@/components/shared/IssueCard";

const CITY_IMG = "https://images.unsplash.com/photo-1510672151757-6a0d9d06b4fb?w=1200&h=400&fit=crop&auto=format";
const CROWD_IMG = "https://images.unsplash.com/photo-1500196861498-ad1b6b9f418c?w=600&h=200&fit=crop&auto=format";

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const active = getActiveIssues().sort((a, b) => b.priorityScore - a.priorityScore);
  const resolved = getResolvedIssues().slice(0, 2);

  return (
    <div className="bg-mesh min-h-full">
      {/* Hero banner */}
      <div className="relative overflow-hidden">
        <img src={CITY_IMG} alt="City" className="w-full h-44 object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-5 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal relative pulse-dot" />
            <span className="text-xs font-mono-civic text-teal uppercase tracking-widest">Live · Arera Colony, Bhopal</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Your Local Civic Overview</h1>
          <p className="text-white/50 text-sm mt-1">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Alert */}
        <div className="glass-card rounded-xl p-4 mb-6 border-l-4 border-danger flex items-start gap-3" style={{ borderLeftColor: "#F04A4A" }}>
          <AlertTriangle size={20} className="flex-shrink-0" style={{ color: "#F04A4A" }} />
          <div>
            <p className="text-sm font-semibold text-foreground">High Priority Issue Active Nearby</p>
            <p className="text-xs text-muted-foreground mt-0.5">Water Supply Problem in Arera Colony — 18 complaints, increasing trend. Authorities are on it.</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
          { label: "Active Issues", value: active.length, color: "text-teal" },
          { label: "High Priority", value: active.filter((i) => i.priority === "HIGH").length, color: "text-danger" },
          { label: "Resolved", value: resolved.length, color: "text-success" }].
          map(({ label, value, color }) =>
          <div key={label} className="glass-card rounded-xl p-4 text-center">
              <div className={`font-display text-3xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          )}
        </div>

        {/* Active issues */}
        <section className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-semibold text-foreground">Active Issues Near You</h2>
            <span className="text-xs text-muted-foreground font-mono-civic">sorted by priority</span>
          </div>
          <div className="flex flex-col gap-3">
            {active.map((issue) =>
            <IssueCard key={issue.id} issue={issue} onClick={() => navigate(`/citizen/issues/${issue.id}`)} />
            )}
          </div>
        </section>

        {/* Community photo + flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          <div className="relative rounded-xl overflow-hidden h-44">
            <img src={CROWD_IMG} alt="Community" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-sm font-display font-semibold">Your Voice Matters</p>
              <p className="text-white/60 text-xs mt-0.5">Every complaint contributes to civic action</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <p className="text-xs font-mono-civic text-muted-foreground uppercase tracking-widest mb-3">How it works</p>
            <div className="flex flex-col gap-2.5">
              {[
              { icon: FileEdit, label: "You report a problem" },
              { icon: Sparkles, label: "AI groups related complaints" },
              { icon: BarChart3, label: "One civic issue is identified" },
              { icon: Landmark, label: "Authority takes targeted action" },
              { icon: CheckCircle2, label: "You verify the resolution" }].
              map((s, i) =>
              <div key={i} className="flex items-center gap-2.5">
                  <span className="w-5 flex items-center justify-center text-teal"><s.icon size={14} /></span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resolved */}
        {resolved.length > 0 &&
        <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Recently Resolved</h2>
            <div className="flex flex-col gap-3">
              {resolved.map((issue) =>
            <IssueCard key={issue.id} issue={issue} onClick={() => navigate(`/citizen/issues/${issue.id}`)} />
            )}
            </div>
          </section>
        }
      </div>
    </div>);

}