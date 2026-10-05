import { FileEdit, Search, Settings2, CheckCircle2, Check } from "lucide-react";


const steps = [
{ status: "NEW", label: "Complaint Submitted", icon: FileEdit },
{ status: "ACTIVE", label: "Under Review", icon: Search },
{ status: "IN_PROGRESS", label: "In Progress", icon: Settings2 },
{ status: "RESOLVED", label: "Resolved", icon: CheckCircle2 }];


const order = ["NEW", "ACTIVE", "IN_PROGRESS", "RESOLVED"];

export default function ComplaintTimeline({ status }) {
  const currentIdx = order.indexOf(status);
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step.status} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm flex-shrink-0 ${
                done ?
                "border-success bg-success/20 text-success" :
                active ?
                "border-teal bg-teal/20 text-teal glow-teal" :
                "border-border bg-secondary text-muted-foreground"}`
                }>
                
                {done ? <Check size={16} /> : <step.icon size={16} />}
              </div>
              {idx < steps.length - 1 &&
              <div className={`w-0.5 h-7 mt-1 ${done ? "bg-success/50" : "bg-border"}`} />
              }
            </div>
            <div className="pt-1.5 pb-2">
              <p className={`text-sm font-medium ${done || active ? "text-foreground" : "text-muted-foreground"}`}>
                {step.label}
              </p>
              {active && <p className="text-xs text-teal mt-0.5 font-mono-civic">Current status</p>}
            </div>
          </div>);

      })}
    </div>);

}