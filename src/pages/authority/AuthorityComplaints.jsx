import { useState } from "react";
import { getComplaints } from "@/services/complaintService";

import ComplaintCard from "@/components/shared/ComplaintCard";
import EmptyState from "@/components/shared/EmptyState";

const categories = ["All", "Water Supply", "Waste / Garbage", "Road / Pothole", "Streetlight", "Drainage", "Other"];
const statuses = [
{ label: "All", value: "ALL" },
{ label: "Submitted", value: "NEW" },
{ label: "Under Review", value: "ACTIVE" },
{ label: "In Progress", value: "IN_PROGRESS" },
{ label: "Resolved", value: "RESOLVED" }];

const areas = ["All", "Arera Colony", "MP Nagar", "Kolar", "Shahpura", "Habibganj"];

export default function AuthorityComplaints() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("ALL");
  const [area, setArea] = useState("All");

  const complaints = getComplaints();
  const filtered = complaints.filter((c) => {
    if (status !== "ALL" && c.status !== status) return false;
    if (category !== "All" && c.category !== category) return false;
    if (area !== "All" && c.area !== area) return false;
    if (search && !c.description.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Complaints</h1>
      <p className="text-muted-foreground text-sm mb-5">All citizen complaints. Multiple complaints may belong to the same civic issue.</p>

      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-card focus:outline-none focus:border-accent" />
        
        <div className="flex flex-wrap gap-2">
          <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="border border-border rounded px-3 py-1.5 text-sm bg-card focus:outline-none">
            {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="border border-border rounded px-3 py-1.5 text-sm bg-card focus:outline-none">
            {categories.map((c) => <option key={c}>{c === "All" ? "All Categories" : c}</option>)}
          </select>
          <select value={area} onChange={(e) => setArea(e.target.value)}
          className="border border-border rounded px-3 py-1.5 text-sm bg-card focus:outline-none">
            {areas.map((a) => <option key={a}>{a === "All" ? "All Areas" : a}</option>)}
          </select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3 font-mono-civic">{filtered.length} complaints</p>

      {filtered.length === 0 ?
      <EmptyState title="No complaints found" /> :

      <div className="flex flex-col gap-3">
          {filtered.map((c) =>
        <ComplaintCard key={c.id} complaint={c} />
        )}
        </div>
      }
    </div>);

}