

const classMap = {
  HIGH: "priority-bg-high priority-high border",
  MEDIUM: "priority-bg-medium priority-medium border",
  LOW: "priority-bg-low priority-low border"
};

export default function PriorityBadge({ priority, score }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium font-mono-civic ${classMap[priority]}`}>
      <span>{priority}</span>
      {score !== undefined && <span className="opacity-50">· {score}</span>}
    </span>);

}