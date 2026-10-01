import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getComplaintById } from "@/services/complaintService";
import { getIssueById } from "@/services/issueService";
import StatusBadge from "@/components/shared/StatusBadge";
import ComplaintTimeline from "@/components/shared/ComplaintTimeline";

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const complaint = getComplaintById(id);

  if (!complaint) return (
    <div className="bg-mesh min-h-full flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-3">Complaint not found.</p>
        <button onClick={() => navigate(-1)} className="text-sm text-teal hover:underline inline-flex items-center gap-1"><ArrowLeft size={13} /> Back</button>
      </div>
    </div>);


  const issue = complaint.relatedIssueId ? getIssueById(complaint.relatedIssueId) : null;

  return (
    <div className="bg-mesh min-h-full px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground hover:text-foreground mb-5 flex items-center gap-1">
          <ArrowLeft size={14} /> Back
        </button>

        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-xs font-mono-civic text-teal">{complaint.id}</span>
            <h1 className="font-display text-2xl font-bold text-foreground mt-0.5">{complaint.category}</h1>
            <p className="text-muted-foreground text-sm">{complaint.subcategory} · {complaint.area}</p>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Description */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1.5">Description</p>
          <p className="text-sm text-foreground leading-relaxed">"{complaint.description}"</p>
        </div>
        {/* Photo */}
        {complaint.photo && (
          <div className="glass-card rounded-xl p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-2">
              Uploaded Photo
            </p>

            <img
              src={URL.createObjectURL(complaint.photo)}
              alt="Complaint"
              className="w-full max-h-80 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Details */}
        <div className="glass-card rounded-xl divide-y divide-white/8 mb-4">
          {[
          { label: "Location", value: complaint.location },
          { label: "Address", value: complaint.address || "Not provided" },
          { label: "Submitted", value: new Date(complaint.submittedAt).toLocaleString("en-IN") },
          { label: "Reported Duration", value: complaint.reportedDuration },
          { label: "Reporter", value: complaint.reporterName }].
          map(({ label, value }) =>
          <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-xs text-foreground font-medium">{value}</span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="glass-card rounded-xl p-5 mb-4">
          <p className="text-sm font-medium text-foreground mb-4">Status Timeline</p>
          <ComplaintTimeline status={complaint.status} />
        </div>

        {/* Related Issue */}
        {issue ?
        <div className="glass-card rounded-xl p-5" style={{ borderColor: "rgba(249,115,22,0.2)" }}>
            <div className="text-xs font-mono-civic text-muted-foreground uppercase tracking-widest mb-3">Your Complaint</div>
            <div className="glass rounded-lg p-3 mb-4 border border-border">
              <p className="text-xs font-mono-civic text-teal mb-1">{complaint.id}</p>
              <p className="text-sm text-foreground">"{complaint.description}"</p>
            </div>

            <div className="flex flex-col items-center my-3 gap-1">
              <div className="flow-line w-0.5 h-5" />
              <div className="px-3 py-1 text-xs font-mono-civic text-teal bg-teal/10 border border-teal/25 rounded-full inline-flex items-center gap-1.5">
                AI matched <ArrowRight size={11} /> Civic Issue
              </div>
              <div className="flow-line w-0.5 h-5" />
            </div>

            <div className="text-xs font-mono-civic text-muted-foreground uppercase tracking-widest mb-3">Related Civic Issue</div>
            <div
            className="rounded-xl p-4 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(100,116,139,0.12))", border: "1px solid rgba(249,115,22,0.25)" }}
            onClick={() => navigate(`/citizen/issues/${issue.id}`)}>
            
              <p className="text-xs font-mono-civic text-teal/70 mb-1">{issue.id}</p>
              <p className="font-display text-lg font-bold text-foreground">{issue.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{issue.area} · {issue.complaintCount} related complaints</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Your complaint was connected with other reports describing the same underlying civic problem.
            </p>
          </div> :

        <div className="glass-card rounded-xl p-4 text-sm text-muted-foreground">
            This complaint has not yet been linked to a civic issue. The system will analyze it and may connect it with similar reports.
            {/* TODO: Replace mock AI result with backend response. */}
          </div>
        }
      </div>
    </div>);

}