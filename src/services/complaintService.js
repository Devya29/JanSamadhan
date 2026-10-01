import { mockComplaints } from "@/data/mockComplaints";

// In-memory store for submitted complaints (supports new submissions)
let complaints = [...mockComplaints];

// TODO: Replace mock submission with POST /api/complaints
export function createComplaint(data) {
  const id = `CMP-${1080 + Math.floor(Math.random() * 900)}`;
  const newComplaint = {
    ...data,
    id,
    submittedAt: new Date().toISOString(),
    status: "NEW",
    relatedIssueId: null
  };
  complaints = [newComplaint, ...complaints];
  return newComplaint;
}

// TODO: Fetch real status from GET /api/complaints
export function getComplaints() {
  return complaints;
}

// TODO: Fetch real status from GET /api/complaints/{id}
export function getComplaintById(id) {
  return complaints.find((c) => c.id === id);
}

export function getComplaintsByIssueId(issueId) {
  return complaints.filter((c) => c.relatedIssueId === issueId);
}

export function getMyComplaints(email) {
  return complaints.filter((c) => c.reporterEmail === email);
}

// TODO: PATCH /api/complaints/{id}/status
export function updateComplaintStatus(id, status) {
  complaints = complaints.map((c) => c.id === id ? { ...c, status } : c);
}