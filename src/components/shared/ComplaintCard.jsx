
import { INK, INK_SOFT, BORDER, SURFACE, SAFFRON, SAFFRON_SOFT, STATUS_COLORS } from "@/lib/civicTheme";







const STATUS_LABEL = {
  NEW: "SUBMITTED",
  ACTIVE: "UNDER REVIEW",
  IN_PROGRESS: "IN PROGRESS",
  RESOLVED: "RESOLVED"
};
const STATUS_KEY = {
  NEW: "UNASSIGNED",
  ACTIVE: "UNDER_REVIEW",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED"
};

export default function ComplaintCard({ complaint, onClick, onGiveFeedback }) {
  const st = STATUS_COLORS[STATUS_KEY[complaint.status]];
  const resolved = complaint.status === "RESOLVED";

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl px-5 py-4 transition-all ${onClick ? "cursor-pointer hover:shadow-md" : ""}`}
      style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
      
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <p className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>{complaint.description}</p>
        <span
          className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full"
          style={{ color: st.color, background: st.soft, letterSpacing: "0.04em" }}>
          
          {STATUS_LABEL[complaint.status]}
        </span>
      </div>
      <p className="text-xs mb-3" style={{ color: INK_SOFT }}>{complaint.area} · {complaint.category}</p>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs" style={{ color: INK_SOFT }}>
          Reported: {new Date(complaint.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })},{" "}
          {new Date(complaint.submittedAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}
        </span>
        {resolved && onGiveFeedback &&
        <button
          onClick={(e) => {e.stopPropagation();onGiveFeedback();}}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
          style={{ background: SAFFRON_SOFT, color: SAFFRON, border: `1px solid ${SAFFRON}33` }}>
          
            Give Feedback
          </button>
        }
      </div>
    </div>);

}