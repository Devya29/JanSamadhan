import { mockComplaints } from "@/data/mockComplaints";
import { supabase } from "@/lib/supabase";

// In-memory store for existing mock functionality
let complaints = [...mockComplaints];

// TODO: Replace mock submission with POST /api/complaints
export async function createComplaint(data) {
  const { data: complaint, error } = await supabase
    .from("complaints")
    .insert({
      title: data.title,
      description: data.description,
      category: data.category,
      subcategory: data.subcategory,
      area: data.area,
      address: data.address,
      reported_duration: data.reportedDuration,
      status: "SUBMITTED"
    })
    .select()
    .single();

  if (error) {
    console.error("Complaint creation failed:", error);
    throw error;
  }

  return {
    id: complaint.id,
    title: complaint.title,
    description: complaint.description,
    category: complaint.category,
    subcategory: complaint.subcategory,
    area: complaint.area,
    address: complaint.address,
    reportedDuration: complaint.reported_duration,
    submittedAt: complaint.created_at,
    status: complaint.status,
    relatedIssueId: null
  };
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
  complaints = complaints.map((c) =>
    c.id === id ? { ...c, status } : c
  );
}