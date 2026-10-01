import { useState } from "react";
import { X, Check } from "lucide-react";
import { INK, INK_SOFT, BORDER, GREEN, GREEN_SOFT, CORAL, CORAL_SOFT } from "@/lib/civicTheme";







export default function FeedbackModal({ complaintTitle, onClose, onSubmit }) {
  const [choice, setChoice] = useState(null);
  const [comment, setComment] = useState("");

  const submit = () => {
    if (choice === null) return;
    onSubmit(choice, comment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(26,24,21,0.5)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative" style={{ border: `1px solid ${BORDER}` }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5" style={{ color: INK_SOFT }}>
          <X size={16} />
        </button>
        <p className="text-xs font-medium mb-1 truncate pr-8" style={{ color: INK_SOFT }}>{complaintTitle}</p>
        <h2 className="jc-heading font-bold text-lg mb-5" style={{ color: INK }}>Was your issue actually resolved?</h2>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setChoice(true)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
            style={choice === true ? { background: GREEN, color: "#fff" } : { background: GREEN_SOFT, color: GREEN, border: `1px solid ${GREEN}33` }}>
            
            <Check size={15} /> Yes, resolved
          </button>
          <button
            onClick={() => setChoice(false)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
            style={choice === false ? { background: CORAL, color: "#fff" } : { background: CORAL_SOFT, color: CORAL, border: `1px solid ${CORAL}33` }}>
            
            <X size={15} /> No, still exists
          </button>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Optional comment…"
          rows={3}
          className="w-full text-sm rounded-xl px-3.5 py-2.5 mb-5 resize-none focus:outline-none"
          style={{ border: `1px solid ${BORDER}`, color: INK }} />
        

        <button
          onClick={submit}
          disabled={choice === null}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
          style={{ background: INK, opacity: choice === null ? 0.4 : 1 }}>
          
          Submit Feedback
        </button>
      </div>
    </div>);

}