import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layers, Flame, Clock, CheckCircle2, ArrowRight, ArrowUpDown,
  TrendingUp, TrendingDown, Minus, MapPin, MessageSquare } from
"lucide-react";
import { getIssues, getResolvedIssues, getHighPriorityIssues } from "@/services/issueService";

import {
  INK, INK_SOFT, PAPER, BORDER, SURFACE,
  SAFFRON, CORAL, CORAL_SOFT, MUSTARD, MUSTARD_SOFT,
  GREEN, GREEN_SOFT, PRIORITY_COLORS, STATUS_COLORS } from
"@/lib/civicTheme";



function TrendIcon({ trend }) {
  if (trend === "Increasing") return <TrendingUp size={13} style={{ color: CORAL }} />;
  if (trend === "Decreasing") return <TrendingDown size={13} style={{ color: GREEN }} />;
  return <Minus size={13} style={{ color: INK_SOFT }} />;
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("all");

  const allIssues = getIssues();
  const resolved = getResolvedIssues();
  const priority = getHighPriorityIssues();
  const inProgress = allIssues.filter((i) => i.status === "IN_PROGRESS");

  const cards = [
  { id: "all", label: "Total Issues", value: allIssues.length, icon: Layers, color: INK, soft: "#E2E8F0", cta: "View issues" },
  { id: "priority", label: "Priority Issues", value: priority.length, icon: Flame, color: CORAL, soft: CORAL_SOFT, cta: "View priority" },
  { id: "inprogress", label: "In Progress", value: inProgress.length, icon: Clock, color: MUSTARD, soft: MUSTARD_SOFT, cta: "View active" },
  { id: "resolved", label: "Resolved", value: resolved.length, icon: CheckCircle2, color: GREEN, soft: GREEN_SOFT, cta: "View resolved" }];


  const sectionTitle = {
    all: "All Reported Civic Issues",
    priority: "Prioritized Civic Issues",
    inprogress: "Issues Currently In Progress",
    resolved: "Resolved Civic Issues"
  };

  return (
    <div className="jc-body min-h-full px-4 py-8" style={{ background: PAPER }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="jc-heading text-2xl font-bold mb-1" style={{ color: INK }}>Authority Dashboard</h1>
        <p className="text-sm mb-6" style={{ color: INK_SOFT }}>Sector 4, Bhopal — civic issue overview.</p>

        {/* 4 clickable cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map((c) => {
            const active = view === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setView(c.id)}
                className="text-left rounded-2xl p-5 transition-all"
                style={{
                  background: SURFACE,
                  border: `1.5px solid ${active ? c.color : BORDER}`,
                  boxShadow: active ? `0 6px 20px ${c.color}22` : "0 1px 2px rgba(15,23,42,0.04)"
                }}>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: INK_SOFT, letterSpacing: "0.05em" }}>{c.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.soft, color: c.color }}>
                    <c.icon size={15} />
                  </div>
                </div>
                <div className="jc-heading font-extrabold text-3xl mb-3" style={{ color: INK }}>
                  {String(c.value).padStart(2, "0")}
                </div>
                <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: c.color }}>
                  {c.cta} <ArrowRight size={12} />
                </span>
              </button>);

          })}
        </div>

        {/* Dynamic section below */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="jc-heading font-bold text-lg" style={{ color: INK }}>{sectionTitle[view]}</h2>
        </div>

        {view === "all" && <AllIssuesView issues={allIssues} onOpen={(id) => navigate(`/authority/issues/${id}`)} />}
        {view === "priority" && <PriorityView issues={priority} onOpen={(id) => navigate(`/authority/issues/${id}`)} />}
        {view === "inprogress" && <InProgressView issues={inProgress} onOpen={(id) => navigate(`/authority/issues/${id}`)} />}
        {view === "resolved" && <ResolvedView issues={resolved} onOpen={(id) => navigate(`/authority/issues/${id}`)} />}
      </div>
    </div>);

}

/* ---------------- All Issues (filters + sort) ---------------- */
function AllIssuesView({ issues, onOpen }) {
  const [area, setArea] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("newest");

  const areas = useMemo(() => Array.from(new Set(issues.map((i) => i.area))).sort(), [issues]);
  const categories = useMemo(() => Array.from(new Set(issues.map((i) => i.category))).sort(), [issues]);

  const filtered = issues.
  filter((i) => area === "ALL" || i.area === area).
  filter((i) => category === "ALL" || i.category === category).
  filter((i) => status === "ALL" || i.status === status).
  sort((a, b) => {
    const da = new Date(a.firstReportedAt).getTime();
    const db = new Date(b.firstReportedAt).getTime();
    return sort === "newest" ? db - da : da - db;
  });

  const selectStyle = { background: SURFACE, border: `1px solid ${BORDER}`, color: INK };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <select value={area} onChange={(e) => setArea(e.target.value)} className="text-xs rounded-lg px-3 py-2 focus:outline-none" style={selectStyle}>
          <option value="ALL">Area</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="text-xs rounded-lg px-3 py-2 focus:outline-none" style={selectStyle}>
          <option value="ALL">Category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="text-xs rounded-lg px-3 py-2 focus:outline-none" style={selectStyle}>
          <option value="ALL">Status</option>
          <option value="NEW">Submitted</option>
          <option value="ACTIVE">Under Review</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
        <button
          onClick={() => setSort((s) => s === "newest" ? "oldest" : "newest")}
          className="text-xs rounded-lg px-3 py-2 flex items-center gap-1.5 font-medium"
          style={selectStyle}>
          
          <ArrowUpDown size={12} /> {sort === "newest" ? "Newest" : "Oldest"}
        </button>
        <span className="text-xs self-center ml-auto" style={{ color: INK_SOFT }}>{filtered.length} issue{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.map((i) => {
          const st = STATUS_COLORS[i.status === "RESOLVED" ? "RESOLVED" : i.status === "IN_PROGRESS" ? "IN_PROGRESS" : i.assignedDepartment ? "ASSIGNED" : "UNASSIGNED"];
          return (
            <button key={i.id} onClick={() => onOpen(i.id)} className="text-left rounded-xl px-5 py-3.5 transition-shadow hover:shadow-md" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold" style={{ color: INK }}>{i.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: INK_SOFT }}>{i.area}</div>
                  <div className="text-xs mt-1.5" style={{ color: INK_SOFT }}>{i.complaintCount} reports · First reported {fmtDate(i.firstReportedAt)}</div>
                </div>
                <span className="flex-shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-full" style={{ color: st.color, background: st.soft }}>
                  {i.status === "IN_PROGRESS" ? "In Progress" : i.status === "RESOLVED" ? "Resolved" : i.status === "ACTIVE" ? "Under Review" : "New"}
                </span>
              </div>
            </button>);

        })}
        {filtered.length === 0 && <p className="text-sm py-8 text-center" style={{ color: INK_SOFT }}>No issues match these filters.</p>}
      </div>
    </div>);

}

/* ---------------- Priority (detailed intelligence cards) ---------------- */
function PriorityView({ issues, onOpen }) {
  const sorted = [...issues].sort((a, b) => b.priorityScore - a.priorityScore);
  return (
    <div className="flex flex-col gap-4">
      {sorted.map((i) =>
      <div key={i.id} className="rounded-2xl p-5 md:p-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ color: PRIORITY_COLORS[i.priority], background: `${PRIORITY_COLORS[i.priority]}18` }}>
              {i.priority} Priority
            </span>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full" style={{ color: STATUS_COLORS[i.status === "IN_PROGRESS" ? "IN_PROGRESS" : "ASSIGNED"].color, background: STATUS_COLORS[i.status === "IN_PROGRESS" ? "IN_PROGRESS" : "ASSIGNED"].soft }}>
              {i.status === "IN_PROGRESS" ? "In Progress" : i.assignedDepartment ? "Assigned" : "Unassigned"}
            </span>
          </div>

          <div className="jc-heading font-bold text-lg mb-0.5" style={{ color: INK }}>{i.title}</div>
          <div className="text-xs flex items-center gap-1 mb-4" style={{ color: INK_SOFT }}><MapPin size={11} /> {i.area}</div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-xs" style={{ color: INK_SOFT }}>
            <span><strong style={{ color: INK }}>{i.complaintCount}</strong> Reports</span>
            <span><strong style={{ color: INK }}>{i.uniqueReporterCount}</strong> Reporters</span>
            <span><strong style={{ color: INK }}>{i.duration}</strong></span>
            <span className="inline-flex items-center gap-1"><TrendIcon trend={i.trend} /> {i.trend}</span>
          </div>

          {i.priorityFactors.length > 0 &&
        <div className="rounded-xl p-4 mb-4" style={{ background: "#F8FAFC" }}>
              <div className="text-xs font-semibold mb-2" style={{ color: INK }}>Why this issue has high impact</div>
              <ul className="flex flex-col gap-1.5">
                {i.priorityFactors.map((f, idx) =>
            <li key={idx} className="text-xs flex items-start gap-2" style={{ color: INK_SOFT }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: SAFFRON }} />
                    {f}
                  </li>
            )}
              </ul>
            </div>
        }

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 max-w-[220px]">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                <div className="h-full rounded-full" style={{ width: `${i.priorityScore}%`, background: PRIORITY_COLORS[i.priority] }} />
              </div>
              <span className="text-xs font-bold flex-shrink-0" style={{ color: INK }}>{i.priorityScore}/100</span>
            </div>
            <button onClick={() => onOpen(i.id)} className="text-xs font-semibold inline-flex items-center gap-1 flex-shrink-0" style={{ color: SAFFRON }}>
              View Details <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
      {sorted.length === 0 && <p className="text-sm py-8 text-center" style={{ color: INK_SOFT }}>No high-priority issues right now.</p>}
    </div>);

}

/* ---------------- In Progress ---------------- */
function InProgressView({ issues, onOpen }) {
  return (
    <div className="flex flex-col gap-2.5">
      {issues.map((i) =>
      <button key={i.id} onClick={() => onOpen(i.id)} className="text-left rounded-xl px-5 py-4 transition-shadow hover:shadow-md" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="text-sm font-semibold" style={{ color: INK }}>{i.title}</div>
              <div className="text-xs mt-0.5" style={{ color: INK_SOFT }}>{i.area}</div>
            </div>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full" style={{ color: PRIORITY_COLORS[i.priority], background: `${PRIORITY_COLORS[i.priority]}18` }}>
              {i.priority}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs" style={{ color: INK_SOFT }}>
            <span>Assigned to: <strong style={{ color: INK }}>{i.assignedDepartment ?? "—"}</strong></span>
            <span>Started: {fmtDate(i.firstReportedAt)}</span>
            <span>Last Updated: {fmtDate(i.lastReportedAt)}</span>
          </div>
        </button>
      )}
      {issues.length === 0 && <p className="text-sm py-8 text-center" style={{ color: INK_SOFT }}>Nothing in progress right now.</p>}
    </div>);

}

/* ---------------- Resolved ---------------- */
function ResolvedView({ issues, onOpen }) {
  return (
    <div className="flex flex-col gap-2.5">
      {issues.map((i) => {
        const needsReview = i.citizenVerificationStatus === "REOPENED";
        return (
          <button key={i.id} onClick={() => onOpen(i.id)} className="text-left rounded-xl px-5 py-4 transition-shadow hover:shadow-md" style={{ background: SURFACE, border: `1px solid ${needsReview ? CORAL : BORDER}` }}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="text-sm font-semibold" style={{ color: INK }}>{i.title}</div>
                <div className="text-xs mt-0.5" style={{ color: INK_SOFT }}>{i.area} · Resolved {i.resolvedAt ? fmtDate(i.resolvedAt) : "—"} · {i.complaintCount} related reports</div>
              </div>
              {needsReview &&
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: CORAL, background: CORAL_SOFT }}>Needs Review</span>
              }
            </div>
            <div className="flex items-center gap-1.5 mt-2.5 text-xs" style={{ color: INK_SOFT }}>
              <MessageSquare size={12} />
              {i.citizenVerificationStatus === "VERIFIED" && "Citizens confirmed this is resolved"}
              {i.citizenVerificationStatus === "REOPENED" && "A citizen reported this is still unresolved"}
              {(i.citizenVerificationStatus === "PENDING" || i.citizenVerificationStatus === null) && "Awaiting citizen verification"}
            </div>
          </button>);

      })}
      {issues.length === 0 && <p className="text-sm py-8 text-center" style={{ color: INK_SOFT }}>No resolved issues yet.</p>}
    </div>);

}