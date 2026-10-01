import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getUnreadCount } from "@/services/notificationService";
import { useState } from "react";
import { INK, INK_SOFT, BORDER, SAFFRON, SAFFRON_SOFT, CORAL } from "@/lib/civicTheme";

const links = [
{ to: "/authority", label: "Dashboard", end: true },
{ to: "/authority/issues", label: "Issues", end: false },
{ to: "/authority/complaints", label: "Complaints", end: false },
{ to: "/authority/map", label: "Map", end: false },
{ to: "/authority/resolved", label: "Resolved", end: false },
{ to: "/authority/notifications", label: "Notifications", end: false },
{ to: "/authority/profile", label: "Profile", end: false }];


export default function AuthorityNav() {
  const { setRole } = useApp();
  const navigate = useNavigate();
  const unread = getUnreadCount("authority");
  const [open, setOpen] = useState(false);

  return (
    <nav className="jc-body sticky top-0 z-40" style={{ background: "rgba(248,250,252,0.94)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="jc-heading text-lg font-bold" style={{ color: INK }}>जनसमाधान</span>
          <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: SAFFRON, border: `1px solid ${SAFFRON}40`, background: SAFFRON_SOFT }}>AUTHORITY</span>
        </div>

        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {links.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={({ isActive }) => isActive ?
            { background: SAFFRON_SOFT, color: SAFFRON, border: `1px solid ${SAFFRON}40` } :
            { color: INK_SOFT, border: "1px solid transparent" }}>
            
              {l.label === "Notifications" && unread > 0 ?
            <span className="relative">
                  {l.label}
                  <span className="absolute -top-2 -right-4 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold" style={{ background: CORAL }}>{unread}</span>
                </span> :
            l.label}
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => {setRole(null);navigate("/");}} className="hidden lg:block px-3 py-1.5 rounded-lg text-xs" style={{ color: INK_SOFT, border: `1px solid ${BORDER}` }}>Exit</button>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-8 h-8 flex items-center justify-center" style={{ color: INK_SOFT }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open &&
      <div className="lg:hidden px-4 py-3 flex flex-col gap-1" style={{ borderTop: `1px solid ${BORDER}` }}>
          {links.map((l) =>
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          onClick={() => setOpen(false)}
          className="block px-3 py-2 rounded-lg text-sm font-medium"
          style={({ isActive }) => isActive ? { background: SAFFRON_SOFT, color: SAFFRON } : { color: INK_SOFT }}>
          
              {l.label}
            </NavLink>
        )}
          <button onClick={() => {setRole(null);navigate("/");}} className="text-left px-3 py-2 text-sm" style={{ color: INK_SOFT, opacity: 0.6 }}>Exit</button>
        </div>
      }
    </nav>);

}