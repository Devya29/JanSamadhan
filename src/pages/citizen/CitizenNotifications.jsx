{/*
  import { useState } from "react";
import { getNotifications, markAllRead } from "@/services/notificationService";

import { NOTIFICATION_ICONS } from "@/lib/notificationIcons";

const typeColors = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  alert: "bg-red-50 border-red-200 text-red-800"
};

export default function CitizenNotifications() {
  const [, forceUpdate] = useState(0);
  const notifications = getNotifications("citizen");

  const handleMarkAll = () => {
    markAllRead("citizen");
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{notifications.filter((n) => !n.read).length} unread</p>
        </div>
        <button onClick={handleMarkAll} className="text-xs text-accent hover:underline">Mark all read</button>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((n) =>
        <div
          key={n.id}
          className={`border rounded-md p-4 ${n.read ? "opacity-60" : ""} ${typeColors[n.type]}`}>
          
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0">{(() => {const Icon = NOTIFICATION_ICONS[n.type];return <Icon size={17} />;})()}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-current flex-shrink-0" />}
                </div>
                <p className="text-xs mt-0.5 leading-relaxed opacity-90">{n.message}</p>
                <p className="text-xs mt-1.5 opacity-60 font-mono-civic">{new Date(n.timestamp).toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}*/}