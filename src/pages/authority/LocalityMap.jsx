import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveIssues } from "@/services/issueService";

import PriorityBadge from "@/components/shared/PriorityBadge";
import TrendBadge from "@/components/shared/TrendBadge";

// Mock coordinates for areas (relative to a 600x400 canvas)
const areaPositions = {
  "Arera Colony": { x: 300, y: 200 },
  "MP Nagar": { x: 180, y: 150 },
  "Kolar": { x: 440, y: 280 },
  "Shahpura": { x: 380, y: 120 },
  "Habibganj": { x: 220, y: 280 },
  "Piplani": { x: 460, y: 180 }
};

const priorityColors = {
  HIGH: "#DC2626",
  MEDIUM: "#D97706",
  LOW: "#16A34A"
};

// TODO: Replace mock map data with real location/GPS data.

export default function LocalityMap() {
  const navigate = useNavigate();
  const issues = getActiveIssues();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);

  const categories = ["All", "Water Supply", "Waste / Garbage", "Road / Pothole", "Streetlight", "Drainage"];
  const priorities = ["ALL", "HIGH", "MEDIUM", "LOW"];

  const filtered = issues.filter((i) => {
    if (priorityFilter !== "ALL" && i.priority !== priorityFilter) return false;
    if (categoryFilter !== "All" && i.category !== categoryFilter) return false;
    return true;
  });

  const selectedIssue = selected ? filtered.find((i) => i.id === selected) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Map / Locality View</h1>
      <p className="text-muted-foreground text-sm mb-5">Civic issues by area. Click a marker to see issue details.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
        className="border border-border rounded px-3 py-1.5 text-sm bg-card focus:outline-none">
          {categories.map((c) => <option key={c}>{c === "All" ? "All Categories" : c}</option>)}
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
        className="border border-border rounded px-3 py-1.5 text-sm bg-card focus:outline-none">
          {priorities.map((p) => <option key={p} value={p}>{p === "ALL" ? "All Priorities" : p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Map canvas */}
        <div className="lg:col-span-2 bg-card border border-border rounded-md overflow-hidden">
          <div className="bg-teal/5 p-3 border-b border-border">
            <p className="text-xs font-mono-civic text-muted-foreground">Bhopal — Civic Issue Map (Schematic)</p>
          </div>
          <div className="relative" style={{ paddingBottom: "66.6%" }}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 400"
              style={{ background: "#F0F4F8" }}>
              
              {/* Background grid */}
              {[...Array(12)].map((_, i) =>
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#D6D3CE" strokeWidth="0.5" />
              )}
              {[...Array(8)].map((_, i) =>
              <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#D6D3CE" strokeWidth="0.5" />
              )}

              {/* Area labels */}
              {Object.entries(areaPositions).map(([area, pos]) =>
              <text key={area} x={pos.x} y={pos.y - 30} textAnchor="middle" className="text-xs" fontSize="10" fill="#6B7280">
                  {area}
                </text>
              )}

              {/* Issue markers */}
              {filtered.map((issue) => {
                const pos = areaPositions[issue.area];
                if (!pos) return null;
                const isSelected = selected === issue.id;
                const color = priorityColors[issue.priority];
                return (
                  <g key={issue.id} onClick={() => setSelected(isSelected ? null : issue.id)} style={{ cursor: "pointer" }}>
                    <circle cx={pos.x} cy={pos.y} r={isSelected ? 18 : 14} fill={color} opacity={0.15} />
                    <circle cx={pos.x} cy={pos.y} r={isSelected ? 12 : 9} fill={color} stroke="white" strokeWidth="2" />
                    <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
                      {issue.complaintCount}
                    </text>
                  </g>);

              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="p-3 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
            {["HIGH", "MEDIUM", "LOW"].map((p) =>
            <div key={p} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: priorityColors[p] }} />
                {p}
              </div>
            )}
            <span className="ml-auto font-mono-civic"># = complaint count</span>
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-3">
          {selectedIssue ?
          <div className="bg-card border border-border rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <PriorityBadge priority={selectedIssue.priority} />
                <TrendBadge trend={selectedIssue.trend} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{selectedIssue.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{selectedIssue.area} · {selectedIssue.category}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono-civic">
                <div><span className="text-muted-foreground">Complaints</span><br /><strong>{selectedIssue.complaintCount}</strong></div>
                <div><span className="text-muted-foreground">Reporters</span><br /><strong>{selectedIssue.uniqueReporterCount}</strong></div>
                <div><span className="text-muted-foreground">Duration</span><br /><strong>{selectedIssue.duration}</strong></div>
                <div><span className="text-muted-foreground">Score</span><br /><strong>{selectedIssue.priorityScore}/100</strong></div>
              </div>
              <button
              onClick={() => navigate(`/authority/issues/${selectedIssue.id}`)}
              className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:opacity-90">
              
                View Full Details
              </button>
            </div> :

          <div className="bg-card border border-border rounded-md p-4 text-sm text-muted-foreground">
              Click a marker on the map to see issue details.
            </div>
          }

          <div className="bg-card border border-border rounded-md p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Issues on Map ({filtered.length})</p>
            <div className="flex flex-col gap-2">
              {filtered.map((i) =>
              <button
                key={i.id}
                onClick={() => setSelected(i.id === selected ? null : i.id)}
                className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${selected === i.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: priorityColors[i.priority] }} />
                    <span className="truncate font-medium">{i.title}</span>
                  </div>
                  <span className="text-xs opacity-70 ml-4">{i.area}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}