import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here", message = "", icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full glass border border-border flex items-center justify-center mb-4 text-teal">
        <Icon size={22} />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {message && <p className="text-xs text-muted-foreground mt-1 max-w-xs">{message}</p>}
    </div>);

}