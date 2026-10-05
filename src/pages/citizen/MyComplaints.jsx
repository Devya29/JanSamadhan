import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getMyComplaints } from "@/services/complaintService";
import { submitCitizenFeedback } from "@/services/issueService";
import { citizenUser } from "@/data/mockUsers";

import ComplaintCard from "@/components/shared/ComplaintCard";
import FeedbackModal from "@/components/shared/FeedbackModal";
import EmptyState from "@/components/shared/EmptyState";
import { INK, INK_SOFT, PAPER, BORDER, SAFFRON, SAFFRON_SOFT } from "@/lib/civicTheme";

const filters = [
{ label: "All", value: "ALL" },
{ label: "Submitted", value: "NEW" },
{ label: "Under Review", value: "ACTIVE" },
{ label: "In Progress", value: "IN_PROGRESS" },
{ label: "Resolved", value: "RESOLVED" }];


export default function MyComplaints() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [feedbackFor, setFeedbackFor] = useState(null);
  const [, forceUpdate] = useState(0);

  const all = getMyComplaints(citizenUser.email);
  const filtered = all.
  filter((c) => filter === "ALL" || c.status === filter).
  filter((c) => !search || c.description.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));

  const handleFeedbackSubmit = (resolved, comment) => {
    if (feedbackFor?.relatedIssueId) {
      submitCitizenFeedback(feedbackFor.relatedIssueId, resolved, comment);
    }
    setFeedbackFor(null);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="jc-body min-h-full px-4 py-8" style={{ background: PAPER }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="jc-heading text-2xl font-bold mb-1" style={{ color: INK }}>My Complaints</h1>
        <p className="text-sm mb-5" style={{ color: INK_SOFT }}>All complaints submitted by you.</p>

        <div className="relative mb-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: INK_SOFT }} />
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl focus:outline-none"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, color: INK }} />
          
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={active ? { background: SAFFRON_SOFT, color: SAFFRON, border: `1px solid ${SAFFRON}40` } : { background: "#fff", color: INK_SOFT, border: `1px solid ${BORDER}` }}>
                
                {f.label} ({all.filter((c) => f.value === "ALL" || c.status === f.value).length})
              </button>);

          })}
        </div>

        {filtered.length === 0 ?
        <EmptyState title="No complaints found" message="Try a different filter or search term." /> :

        <div className="flex flex-col gap-3">
            {filtered.map((c) =>
          <ComplaintCard
            key={c.id}
            complaint={c}
            onClick={() => navigate(`/citizen/complaints/${c.id}`)}
            onGiveFeedback={() => setFeedbackFor(c)} />

          )}
          </div>
        }
      </div>

      {feedbackFor &&
      <FeedbackModal
        complaintTitle={feedbackFor.description}
        onClose={() => setFeedbackFor(null)}
        onSubmit={handleFeedbackSubmit} />

      }
    </div>);

}