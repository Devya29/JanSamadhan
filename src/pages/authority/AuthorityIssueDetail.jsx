import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getIssueById, updateIssueStatus, assignIssue, resolveIssue } from "@/services/issueService";
import { getComplaintsByIssueId } from "@/services/complaintService";

import StatusBadge from "@/components/shared/StatusBadge";
import PriorityBadge from "@/components/shared/PriorityBadge";
import TrendBadge from "@/components/shared/TrendBadge";
import ComplaintCard from "@/components/shared/ComplaintCard";

const departments = ["Water Department", "Waste Management", "Roads Department", "Electrical Department", "Drainage Department"];
const statusOptions = [
{ label: "Under Review", value: "ACTIVE" },
{ label: "In Progress", value: "IN_PROGRESS" },
{ label: "Resolved", value: "RESOLVED" }];


// TODO: PATCH /api/issues/{id}/assign
// TODO: PATCH /api/issues/{id}/status

export default function AuthorityIssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);
  const [assignDept, setAssignDept] = useState("");
  const [assignOfficial, setAssignOfficial] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const issue = getIssueById(id);
  if (!issue) return <div className="max-w-3xl mx-auto px-4 py-8 text-muted-foreground">Issue not found.</div>;

  const complaints = getComplaintsByIssueId(id);

  const handleAssign = () => {
    if (assignDept) {
      assignIssue(id, assignDept, assignOfficial || undefined);
      forceUpdate((n) => n + 1);
      setSaved(true);
    }
  };

  const handleStatusUpdate = () => {
    if (newStatus) {
      updateIssueStatus(id, newStatus);
      forceUpdate((n) => n + 1);
      setSaved(true);
    }
  };

  const handleResolve = () => {
    resolveIssue(id, resolutionNote);
    setShowResolveModal(false);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1">
        <ArrowLeft size={14} /> Back
      </button>

      {saved &&
      <div className="mb-4 bg-green-50 border border-green-200 rounded-md px-4 py-2 text-sm text-green-800">
          Changes saved successfully.
        </div>
      }

      {/* Header */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-mono-civic text-accent">{issue.id}</span>
          <PriorityBadge priority={issue.priority} score={issue.priorityScore} />
          <StatusBadge status={issue.status} />
          <TrendBadge trend={issue.trend} />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">{issue.title}</h1>
        <p className="text-muted-foreground mt-1">{issue.location} · {issue.category}</p>
        <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{issue.summary}</p>
      </div>

      {/* Intelligence */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
        { label: "Complaints", value: issue.complaintCount },
        { label: "Reporters", value: issue.uniqueReporterCount },
        { label: "Duration", value: issue.duration },
        { label: "Priority Score", value: `${issue.priorityScore}/100` }].
        map(({ label, value }) =>
        <div key={label} className="bg-card border border-border rounded-md p-3 text-center">
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        )}
      </div>

      {/* Factors */}
      <div className="bg-secondary border border-border rounded-md p-4 mb-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Why This Issue Is High Priority</p>
        <ul className="flex flex-col gap-1">
          {issue.priorityFactors.map((f, i) =>
          <li key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="text-accent">·</span> {f}
            </li>
          )}
        </ul>
      </div>

      {/* Authority Actions */}
      {issue.status !== "RESOLVED" &&
      <div className="bg-card border border-border rounded-md p-5 mb-5">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Authority Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Assign Department</label>
              <select
              value={assignDept || issue.assignedDepartment || ""}
              onChange={(e) => setAssignDept(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent">
              
                <option value="">Select department</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Assigned Official</label>
              <input
              type="text"
              placeholder="Official name (optional)"
              value={assignOfficial || issue.assignedOfficial || ""}
              onChange={(e) => setAssignOfficial(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent" />
            
            </div>
          </div>
          <button onClick={handleAssign} className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:opacity-90 mr-3">
            Assign Issue
          </button>

          <div className="border-t border-border pt-4 mt-4">
            <label className="block text-xs font-medium text-muted-foreground mb-1">Update Status</label>
            <div className="flex gap-2">
              <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="flex-1 border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent">
              
                <option value="">Select status</option>
                {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <button onClick={handleStatusUpdate} className="px-4 py-2 bg-secondary text-foreground border border-border rounded text-sm font-medium hover:bg-muted">
                Update Status
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
            onClick={() => setShowResolveModal(true)}
            className="w-full py-2.5 bg-success text-white rounded text-sm font-semibold hover:opacity-90">
            
              Mark as Resolved
            </button>
          </div>
        </div>
      }

      {/* Resolved state */}
      {issue.status === "RESOLVED" &&
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-5">
          <p className="font-semibold text-green-800 mb-1 flex items-center gap-1.5"><CheckCircle2 size={16} /> Issue Resolved</p>
          <p className="text-sm text-green-700">Resolved: {issue.resolvedAt ? new Date(issue.resolvedAt).toLocaleString("en-IN") : "—"}</p>
          {issue.resolutionNote && <p className="text-sm text-green-800 mt-1 italic">"{issue.resolutionNote}"</p>}
          <p className="text-xs text-green-700 mt-2">Citizen verification: {issue.citizenVerificationStatus ?? "Pending"}</p>
        </div>
      }

      {/* Related Complaints */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">Related Complaints ({complaints.length})</h2>
        <div className="flex flex-col gap-3">
          {complaints.map((c) =>
          <ComplaintCard key={c.id} complaint={c} />
          )}
        </div>
      </div>

      {/* Resolve modal */}
      {showResolveModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-md p-6 max-w-md w-full">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Mark Issue as Resolved</h3>
            <p className="text-sm text-muted-foreground mb-4">Add a resolution note describing the action taken.</p>
            <textarea
            rows={4}
            placeholder="Describe the resolution..."
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent resize-none mb-4" />
          
            <div className="flex gap-3">
              <button onClick={handleResolve} className="flex-1 py-2 bg-success text-white rounded text-sm font-semibold">Confirm Resolved</button>
              <button onClick={() => setShowResolveModal(false)} className="flex-1 py-2 bg-secondary text-foreground rounded text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      }
    </div>);

}