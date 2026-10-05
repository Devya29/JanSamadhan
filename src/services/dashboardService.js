import { getIssues, getActiveIssues, getHighPriorityIssues, getResolvedIssues } from "./issueService";
import { getComplaints } from "./complaintService";

// TODO: Replace with GET /api/dashboard/summary
export function getDashboardSummary() {
  const issues = getIssues();
  const active = getActiveIssues();
  const resolved = getResolvedIssues();
  const highPriority = getHighPriorityIssues();
  const increasing = active.filter((i) => i.trend === "Increasing");
  const awaitingAction = active.filter((i) => !i.assignedDepartment);
  const complaints = getComplaints();

  return {
    totalActiveIssues: active.length,
    highPriorityCount: highPriority.length,
    increasingCount: increasing.length,
    awaitingActionCount: awaitingAction.length,
    resolvedCount: resolved.length,
    totalComplaints: complaints.length,
    rankedIssues: [...active].sort((a, b) => b.priorityScore - a.priorityScore)
  };
}