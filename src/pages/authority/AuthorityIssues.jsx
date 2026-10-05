import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveIssues } from "@/services/issueService";

import IssueCard from "@/components/shared/IssueCard";
import EmptyState from "@/components/shared/EmptyState";

const categories = ["All", "Water Supply", "Waste / Garbage", "Road / Pothole", "Streetlight", "Drainage", "Other"];
const priorities = ["ALL", "HIGH", "MEDIUM", "LOW"];
const areas = ["All", "Arera Colony", "MP Nagar", "Kolar", "Shahpura", "Habibganj"];

export default function AuthorityIssues() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("ALL");
  const [area, setArea] = useState("All");

  const issues = getActiveIssues();
  const filtered = issues.filter((i) => {
    if (priority !== "ALL" && i.priority !== priority) return false;
    if (category !== "All" && i.category !== category) return false;
    if (area !== "All" && i.area !== area) return false;
    if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Civic Issues</h1>
      <p className="text-muted-foreground text-sm mb-5">All active civic issues ranked by priority.</p>

      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-card focus:outline-none focus:border-accent" />
        
        <div className="flex flex-wrap gap-2">
          <select value={priority} onChange={(e) => setPriority(e.target.value)}
          className="border border-border rounded px-3 py-1.5 text-sm bg-card focus:outline-none">
            {priorities.map((p) => <option key={p} value={p}>{p === "ALL" ? "All Priorities" : p}</option>)}
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

      {filtered.length === 0 ?
      <EmptyState title="No active civic issues" message="No issues match the selected filters." /> :

      <div className="flex flex-col gap-3">
          {[...filtered].sort((a, b) => b.priorityScore - a.priorityScore).map((issue, idx) =>
        <IssueCard
          key={issue.id}
          issue={issue}
          rank={idx + 1}
          onClick={() => navigate(`/authority/issues/${issue.id}`)} />

        )}
        </div>
      }
    </div>);

}