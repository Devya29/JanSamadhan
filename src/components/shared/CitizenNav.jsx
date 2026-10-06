import { NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getUnreadCount } from "@/services/notificationService";
import { useState } from "react";
import { INK, INK_SOFT, BORDER, SAFFRON, SAFFRON_SOFT, CORAL } from "@/lib/civicTheme";

const links = [
{ to: "/citizen", label: "Dashboard", end: true },
{ to: "/citizen/report", label: "Report", end: false },
{ to: "/citizen/complaints", label: "My Complaints", end: false },
{ to: "/citizen/issues", label: "Civic Issues", end: false },
/*{ to: "/citizen/notifications", label: "Notifications", end: false },*/
{ to: "/citizen/profile", label: "Profile", end: false }];


export default function CitizenNav() {
  const { setRole } = useApp();
  const navigate = useNavigate();
  const unread = getUnreadCount("citizen");
  const [open, setOpen] = useState(false);

  return (
    <nav className="jc-body sticky top-0 z-40" style={{ background: "rgba(248,250,252,0.94)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="jc-heading text-lg font-bold" style={{ color: INK }}>जनसमाधान</span>
          <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: INK_SOFT, border: `1px solid ${BORDER}` }}>CITIZEN</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {links.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
            `relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all`
            }
            style={({ isActive }) => isActive ?
            { background: SAFFRON_SOFT, color: SAFFRON, border: `1px solid ${SAFFRON}33` } :
            { color: INK_SOFT, border: "1px solid transparent" }}>
            
              {l.label === "Notifications" && unread > 0 ?
            <span className="relative">
                  {l.label}
                  <span className="absolute -top-2 -right-4 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold" style={{ background: CORAL }}>
                    {unread}
                  </span>
                </span> :
            l.label}
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {unread > 0 &&
          <NavLink to="/citizen/notifications" className="md:hidden relative w-8 h-8 flex items-center justify-center" style={{ color: INK_SOFT }}>
              <Bell size={16} />
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full text-white text-[9px] flex items-center justify-center font-bold" style={{ background: CORAL }}>{unread}</span>
            </NavLink>
          }
          <button
            onClick={() => {setRole(null);navigate("/");}}
            className="hidden md:block px-3 py-1.5 rounded-lg text-xs transition-colors"
            style={{ color: INK_SOFT, border: `1px solid ${BORDER}` }}>
            
            Exit
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex items-center justify-center" style={{ color: INK_SOFT }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open &&
      <div className="md:hidden px-4 py-3 flex flex-col gap-1" style={{ borderTop: `1px solid ${BORDER}` }}>
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
          <button onClick={() => {setRole(null);navigate("/");}} className="block px-3 py-2 text-sm text-left" style={{ color: INK_SOFT, opacity: 0.6 }}>Exit</button>
        </div>
      }
    </nav>);

}