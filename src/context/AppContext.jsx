import { createContext, useContext, useState } from "react";
import { citizenUser, authorityUser } from "@/data/mockUsers";









const AppContext = createContext({
  role: null,
  setRole: () => {},
  currentUser: null
});

export function AppProvider({ children }) {
  const [role, setRole] = useState(null);
  const currentUser = role === "citizen" ? citizenUser : role === "authority" ? authorityUser : null;
  return (
    <AppContext.Provider value={{ role, setRole, currentUser }}>
      {children}
    </AppContext.Provider>);

}

export const useApp = () => useContext(AppContext);