import { mockNotifications } from "@/data/mockNotifications";

let notifications = [...mockNotifications];

// TODO: Replace with real notification API
export function getNotifications(role) {
  return notifications.filter((n) => n.role === role);
}

export function getUnreadCount(role) {
  return notifications.filter((n) => n.role === role && !n.read).length;
}

export function markAllRead(role) {
  notifications = notifications.map((n) =>
  n.role === role ? { ...n, read: true } : n
  );
}

export function markRead(id) {
  notifications = notifications.map((n) => n.id === id ? { ...n, read: true } : n);
}