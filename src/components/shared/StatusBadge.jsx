


const labelMap = {
  NEW: "Submitted",
  ACTIVE: "Under Review",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved"
};

const classMap = {
  NEW: "status-submitted",
  ACTIVE: "status-review",
  IN_PROGRESS: "status-progress",
  RESOLVED: "status-resolved"
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium font-mono-civic ${classMap[status]}`}>
      {labelMap[status]}
    </span>);

}