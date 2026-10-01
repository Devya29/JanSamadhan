import { citizenUser } from "@/data/mockUsers";
import { getMyComplaints } from "@/services/complaintService";

export default function CitizenProfile() {
  const complaints = getMyComplaints(citizenUser.email);
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const active = complaints.filter((c) => c.status !== "RESOLVED").length;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">My Profile</h1>

      <div className="bg-card border border-border rounded-md p-6 mb-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-display font-bold">
            {citizenUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">{citizenUser.name}</h2>
            <p className="text-sm text-muted-foreground">{citizenUser.locality}</p>
          </div>
        </div>
        <div className="border-t border-border pt-4 space-y-3">
          {[
          { label: "Email", value: citizenUser.email },
          { label: "Phone", value: citizenUser.phone },
          { label: "Locality", value: citizenUser.locality },
          { label: "Preferred Language", value: citizenUser.preferredLanguage }].
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
        { label: "Total Complaints", value: complaints.length },
        { label: "Active", value: active },
        { label: "Resolved", value: resolved }].
        map(({ label, value }) =>
        <div key={label} className="bg-card border border-border rounded-md p-4 text-center">
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        )}
      </div>
    </div>);

}