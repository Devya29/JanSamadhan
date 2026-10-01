import { mockIssues } from "@/data/mockIssues";

let issues = [...mockIssues];

// TODO: Replace mock issue intelligence with backend response.
export function getIssues() {
  return issues;
}

// TODO: Fetch from GET /api/issues/{id}
export function getIssueById(id) {
  return issues.find((i) => i.id === id);
}

export function getActiveIssues() {
  return issues.filter((i) => i.status !== "RESOLVED");
}

export function getResolvedIssues() {
  return issues.filter((i) => i.status === "RESOLVED");
}

export function getHighPriorityIssues() {
  return issues.filter((i) => i.priority === "HIGH" && i.status !== "RESOLVED");
}

// TODO: PATCH /api/issues/{id}/status
export function updateIssueStatus(id, status) {
  issues = issues.map((i) => i.id === id ? { ...i, status } : i);
}

// TODO: PATCH /api/issues/{id}/assign
export function assignIssue(id, department, official) {
  issues = issues.map((i) =>
  i.id === id ?
  { ...i, assignedDepartment: department, assignedOfficial: official ?? i.assignedOfficial } :
  i
  );
}

// TODO: POST /api/issues/{id}/resolve
export function resolveIssue(id, note) {
  issues = issues.map((i) =>
  i.id === id ?
  {
    ...i,
    status: "RESOLVED",
    resolutionNote: note,
    resolvedAt: new Date().toISOString(),
    citizenVerificationStatus: "PENDING"
  } :
  i
  );
}

// TODO: POST /api/issues/{id}/feedback
export function submitCitizenFeedback(id, verified, comment) {
  issues = issues.map((i) =>
  i.id === id ?
  { ...i, citizenVerificationStatus: verified ? "VERIFIED" : "REOPENED", citizenFeedbackComment: comment || null } :
  i
  );
}

export function getIssuesByComplaintIds(ids) {
  return issues.filter((i) => ids.some((cmpId) => i.relatedComplaintIds.includes(cmpId)));
}