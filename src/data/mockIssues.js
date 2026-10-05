































// TODO: Replace mock issue intelligence with backend response.
// TODO: Priority score will come from backend.
// TODO: Trend analysis will come from backend.
// TODO: Issue matching will come from backend/AI service.

export const mockIssues = [
{
  id: "ISS-104",
  title: "Water Supply Problem",
  summary: "Multiple residents of Arera Colony report consistently low water pressure and intermittent supply, indicating a systemic distribution failure.",
  category: "Water Supply",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  complaintCount: 18,
  uniqueReporterCount: 13,
  firstReportedAt: "2026-09-09T08:15:00Z",
  lastReportedAt: "2026-09-14T09:30:00Z",
  duration: "5 days",
  trend: "Increasing",
  impact: "HIGH",
  priority: "HIGH",
  priorityScore: 87,
  status: "IN_PROGRESS",
  assignedDepartment: "Water Department",
  assignedOfficial: "Rajesh Sharma",
  relatedComplaintIds: ["CMP-1041", "CMP-1048", "CMP-1052", "CMP-1061", "CMP-1064", "CMP-1067"],
  resolutionNote: null,
  resolvedAt: null,
  citizenVerificationStatus: null,
  priorityFactors: [
  "Many unique reporters (13 individuals)",
  "Long reported duration (5 days)",
  "Increasing number of reports",
  "High area concentration in Arera Colony"]

},
{
  id: "ISS-107",
  title: "Garbage Accumulation",
  summary: "Large volumes of uncollected waste building up at multiple collection points in MP Nagar, posing hygiene and health risks.",
  category: "Waste / Garbage",
  location: "MP Nagar, Bhopal",
  area: "MP Nagar",
  complaintCount: 12,
  uniqueReporterCount: 9,
  firstReportedAt: "2026-09-11T10:00:00Z",
  lastReportedAt: "2026-09-14T11:00:00Z",
  duration: "3 days",
  trend: "Increasing",
  impact: "MEDIUM",
  priority: "MEDIUM",
  priorityScore: 64,
  status: "ACTIVE",
  assignedDepartment: null,
  assignedOfficial: null,
  relatedComplaintIds: ["CMP-1053", "CMP-1055", "CMP-1058", "CMP-1062"],
  resolutionNote: null,
  resolvedAt: null,
  citizenVerificationStatus: null,
  priorityFactors: [
  "Multiple reporters from distinct addresses",
  "Issue duration growing",
  "Health risk due to waste accumulation"]

},
{
  id: "ISS-099",
  title: "Road Damage / Potholes",
  summary: "Significant road deterioration and potholes on the main arterial road through Kolar, causing traffic disruption and vehicle damage.",
  category: "Road / Pothole",
  location: "Kolar Road, Bhopal",
  area: "Kolar",
  complaintCount: 8,
  uniqueReporterCount: 7,
  firstReportedAt: "2026-09-05T07:00:00Z",
  lastReportedAt: "2026-09-14T08:00:00Z",
  duration: "9 days",
  trend: "Stable",
  impact: "MEDIUM",
  priority: "MEDIUM",
  priorityScore: 58,
  status: "ACTIVE",
  assignedDepartment: "Roads Department",
  assignedOfficial: null,
  relatedComplaintIds: ["CMP-1031", "CMP-1035", "CMP-1039"],
  resolutionNote: null,
  resolvedAt: null,
  citizenVerificationStatus: null,
  priorityFactors: [
  "Long duration without resolution (9 days)",
  "Moderate reporter count",
  "Stable — not worsening rapidly"]

},
{
  id: "ISS-112",
  title: "Streetlight Failure",
  summary: "Several streetlights non-functional in Shahpura residential area, creating safety concerns after dark.",
  category: "Streetlight",
  location: "Shahpura, Bhopal",
  area: "Shahpura",
  complaintCount: 3,
  uniqueReporterCount: 3,
  firstReportedAt: "2026-09-13T18:00:00Z",
  lastReportedAt: "2026-09-14T07:00:00Z",
  duration: "1 day",
  trend: "Stable",
  impact: "LOW",
  priority: "LOW",
  priorityScore: 28,
  status: "NEW",
  assignedDepartment: null,
  assignedOfficial: null,
  relatedComplaintIds: ["CMP-1071", "CMP-1072", "CMP-1073"],
  resolutionNote: null,
  resolvedAt: null,
  citizenVerificationStatus: null,
  priorityFactors: [
  "New issue — limited data",
  "Safety concern after dark"]

},
{
  id: "ISS-089",
  title: "Drainage Overflow",
  summary: "Blocked drainage causing waterlogging on streets in Habibganj area. Issue worsens during rains.",
  category: "Drainage",
  location: "Habibganj, Bhopal",
  area: "Habibganj",
  complaintCount: 22,
  uniqueReporterCount: 17,
  firstReportedAt: "2026-08-28T06:00:00Z",
  lastReportedAt: "2026-09-12T10:00:00Z",
  duration: "17 days",
  trend: "Decreasing",
  impact: "HIGH",
  priority: "HIGH",
  priorityScore: 91,
  status: "RESOLVED",
  assignedDepartment: "Drainage Department",
  assignedOfficial: "Priya Verma",
  relatedComplaintIds: ["CMP-1001", "CMP-1005", "CMP-1009", "CMP-1012"],
  resolutionNote: "Drainage system cleared and de-silted. Root cause identified as seasonal debris accumulation. Preventive schedule updated.",
  resolvedAt: "2026-09-12T16:00:00Z",
  citizenVerificationStatus: "VERIFIED",
  priorityFactors: [
  "Very high reporter count",
  "Long duration",
  "Health and safety risk"]

}];