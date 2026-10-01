












export const mockNotifications = [
{
  id: "NOTIF-001",
  role: "citizen",
  title: "Complaint Under Review",
  message: "Your complaint CMP-1048 is now under review by the authorities.",
  timestamp: "2026-09-10T14:00:00Z",
  read: false,
  type: "info"
},
{
  id: "NOTIF-002",
  role: "citizen",
  title: "Linked to Civic Issue",
  message: "Your complaint CMP-1048 has been connected to Water Supply Problem – Arera Colony.",
  timestamp: "2026-09-11T09:00:00Z",
  read: false,
  type: "info"
},
{
  id: "NOTIF-003",
  role: "citizen",
  title: "Issue In Progress",
  message: "Water Supply Problem – Arera Colony is now In Progress. Water Department has been assigned.",
  timestamp: "2026-09-12T11:00:00Z",
  read: true,
  type: "success"
},
{
  id: "NOTIF-004",
  role: "citizen",
  title: "Alert: High Priority Issue Nearby",
  message: "A High Priority civic issue has been detected in your area: Water Supply Problem – Arera Colony.",
  timestamp: "2026-09-09T10:00:00Z",
  read: true,
  type: "alert"
},
{
  id: "NOTIF-005",
  role: "authority",
  title: "New High-Priority Issue Detected",
  message: "A new HIGH priority civic issue has been automatically detected: Water Supply Problem – Arera Colony (18 complaints, 13 reporters).",
  timestamp: "2026-09-09T10:30:00Z",
  read: false,
  type: "alert"
},
{
  id: "NOTIF-006",
  role: "authority",
  title: "Issue Growing",
  message: "Water Supply Problem – Arera Colony has received 18 related complaints. Trend: Increasing.",
  timestamp: "2026-09-13T08:00:00Z",
  read: false,
  type: "warning"
},
{
  id: "NOTIF-007",
  role: "authority",
  title: "Citizen Feedback Received",
  message: "Citizen feedback indicates that Road Damage – Kolar may still require attention. 2 citizens reported the issue unresolved.",
  timestamp: "2026-09-14T08:00:00Z",
  read: false,
  type: "warning"
},
{
  id: "NOTIF-008",
  role: "authority",
  title: "New Issue: Streetlight Failure",
  message: "A new civic issue has been detected: Streetlight Failure – Shahpura. Currently LOW priority.",
  timestamp: "2026-09-14T07:30:00Z",
  read: false,
  type: "info"
}];