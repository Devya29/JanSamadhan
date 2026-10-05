import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Check, X } from "lucide-react";
import { getIssueById, submitCitizenFeedback } from "@/services/issueService";
import { getComplaintsByIssueId } from "@/services/complaintService";
import StatusBadge from "@/components/shared/StatusBadge";
import PriorityBadge from "@/components/shared/PriorityBadge";
import TrendBadge from "@/components/shared/TrendBadge";

// TODO: Replace mock issue intelligence with backend response.
// TODO: Trend analysis will come from backend.

const IMG_MAP = {
  "Water Supply": "https://images.unsplash.com/photo-1701146125128-b0b03267e58a?w=800&h=250&fit=crop&auto=format",
  "Waste / Garbage": "https://images.unsplash.com/photo-1759401654832-ab2e73a14336?w=800&h=250&fit=crop&auto=format",
  "Road / Pothole": "https://images.unsplash.com/photo-1544411047-c491e34a24e0?w=800&h=250&fit=crop&auto=format"
};

export default function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [, forceUpdate] = useState(0);

  const issue = getIssueById(id);
  if (!issue) return <div className="bg-mesh min-h-full flex items-center justify-center text-muted-foreground">Issue not found.</div>;

  const relatedComplaints = getComplaintsByIssueId(id);
  const heroImg = IMG_MAP[issue.category] ?? "https://images.unsplash.com/photo-1544411047-c491e34a24e0?w=800&h=250&fit=crop&auto=format";

  const handleFeedback = (verified) => {
    submitCitizenFeedback(id, verified);
    setFeedbackGiven(true);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="bg-mesh min-h-full">
      {/* Category hero */}
      <div className="relative overflow-hidden h-36">
        <img src={heroImg} alt={issue.category} className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white border border-white/15 inline-flex items-center gap-1.5">
          <ArrowLeft size={13} /> Back
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono-civic text-teal">{issue.id}</span>
            <PriorityBadge priority={issue.priority} score={issue.priorityScore} />
            <StatusBadge status={issue.status} />
            <TrendBadge trend={issue.trend} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">{issue.title}</h1>
          <p className="text-muted-foreground mt-1">{issue.location} · {issue.category}</p>
          <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{issue.summary}</p>
        </div>

        {/* Intelligence grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
          { label: "Complaints", value: issue.complaintCount, color: "text-teal" },
          { label: "Reporters", value: issue.uniqueReporterCount, color: "text-foreground" },
          { label: "Duration", value: issue.duration, color: "text-warning" },
          { label: "Priority", value: `${issue.priorityScore}/100`, color: "text-danger" }].
          map(({ label, value, color }) =>
          <div key={label} className="glass-card rounded-xl p-4 text-center">
              <div className={`font-display text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          )}
        </div>

        {/* Priority factors */}
        <div className="glass-card rounded-xl p-4 mb-5">
          <p className="text-xs font-mono-civic text-muted-foreground uppercase tracking-widest mb-3">Why This Issue Is Important</p>
          <div className="flex flex-col gap-1.5">
            {issue.priorityFactors.map((f, i) =>
            <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-teal mt-0.5 flex-shrink-0">▸</span> {f}
              </div>
            )}
          </div>
        </div>

        {/* THE KEY VISUAL - Complaints to Issue */}
        <div className="glass-card rounded-xl p-5 mb-5">
          <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">Individual Complaints <ArrowRight size={14} className="text-teal" /> One Civic Issue</p>

          <div className="flex flex-col gap-2 mb-4">
            {relatedComplaints.map((c, i) =>
            <div key={c.id}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{ background: `rgba(249,115,22,${0.03 + i * 0.01})`, border: "1px solid rgba(249,115,22,0.1)" }}>
              
                <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 mt-1.5" />
                <div className="min-w-0">
                  <span className="text-xs font-mono-civic text-teal mr-2">{c.id}</span>
                  <span className="text-xs text-foreground">"{c.description.slice(0, 60)}{c.description.length > 60 ? "…" : ""}"</span>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{c.reporterName} · {new Date(c.submittedAt).toLocaleDateString("en-IN")}</div>
                </div>
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center my-3">
            <div className="flow-line w-0.5 h-6" />
            <div className="px-3 py-1 rounded-full text-xs font-mono-civic border border-teal/25 bg-teal/10 text-teal inline-flex items-center gap-1.5">
              <Sparkles size={12} /> AI grouped by meaning + location + time
              {/* TODO: Issue matching will come from backend/AI service. */}
            </div>
            <div className="flow-line w-0.5 h-6" />
          </div>

          {/* The unified issue */}
          <div className="rounded-xl p-4 text-center glow-teal" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(100,116,139,0.15))", border: "1px solid rgba(249,115,22,0.25)" }}>
            <div className="font-display text-xl font-bold text-foreground">{issue.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{issue.area} · {issue.complaintCount} complaints · {issue.uniqueReporterCount} reporters</div>
          </div>
        </div>

        {/* Resolution feedback */}
        {issue.status === "RESOLVED" &&
        <div className="glass-card rounded-xl p-5 mb-5 border border-success/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={19} className="text-success" />
              <p className="font-semibold text-success">Issue Resolved</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Resolved on {issue.resolvedAt ? new Date(issue.resolvedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"}
            </p>
            {issue.resolutionNote && <p className="text-sm text-foreground/70 mt-2 italic">"{issue.resolutionNote}"</p>}

            {!feedbackGiven && issue.citizenVerificationStatus === "PENDING" &&
          <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">Was the issue actually resolved?</p>
                <div className="flex gap-3">
                  <button onClick={() => handleFeedback(true)}
              className="flex-1 py-2.5 rounded-lg bg-success/20 border border-success/30 text-success text-sm font-semibold hover:bg-success/30 inline-flex items-center justify-center gap-1.5">
                    <Check size={15} /> Yes, resolved
                  </button>
                  <button onClick={() => handleFeedback(false)}
              className="flex-1 py-2.5 rounded-lg bg-danger/10 border border-danger/25 text-danger text-sm font-semibold hover:bg-danger/20 inline-flex items-center justify-center gap-1.5">
                    <X size={15} /> No, still a problem
                  </button>
                </div>
              </div>
          }
            {feedbackGiven &&
          <div className="mt-3 glass rounded-lg p-3 text-sm text-muted-foreground">
                Your feedback has been recorded. Thank you! {/* TODO: POST /api/issues/{id}/feedback */}
              </div>
          }
          </div>
        }

        {/* Details */}
        <div className="glass-card rounded-xl divide-y divide-white/8">
          {[
          { label: "Assigned Department", value: issue.assignedDepartment ?? "Not yet assigned" },
          { label: "First Reported", value: new Date(issue.firstReportedAt).toLocaleString("en-IN") },
          { label: "Last Reported", value: new Date(issue.lastReportedAt).toLocaleString("en-IN") },
          { label: "Impact", value: issue.impact }].
          map(({ label, value }) =>
          <div key={label} className="flex justify-between items-center px-4 py-3">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-xs text-foreground font-medium">{value}</span>
            </div>
          )}
        </div>
      </div>
    </div>);

}