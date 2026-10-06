import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";

import Home from "@/pages/Home";
import Login from "@/pages/Login";

import CitizenNav from "@/components/shared/CitizenNav";
import CitizenDashboard from "@/pages/citizen/CitizenDashboard";
import ReportProblem from "@/pages/citizen/ReportProblem";
import MyComplaints from "@/pages/citizen/MyComplaints";
import ComplaintDetail from "@/pages/citizen/ComplaintDetail";
import MyCivicIssues from "@/pages/citizen/MyCivicIssues";
import IssueDetail from "@/pages/citizen/IssueDetail";
{/*import CitizenNotifications from "@/pages/citizen/CitizenNotifications";*/}
import CitizenProfile from "@/pages/citizen/CitizenProfile";

import AuthorityNav from "@/components/shared/AuthorityNav";
import AuthorityDashboard from "@/pages/authority/AuthorityDashboard";
import AuthorityIssues from "@/pages/authority/AuthorityIssues";
import AuthorityIssueDetail from "@/pages/authority/AuthorityIssueDetail";
import AuthorityComplaints from "@/pages/authority/AuthorityComplaints";
{/*import LocalityMap from "@/pages/authority/LocalityMap";*/}
import ResolvedIssues from "@/pages/authority/ResolvedIssues";
{/*import AuthorityNotifications from "@/pages/authority/AuthorityNotifications";*/}
import AuthorityProfile from "@/pages/authority/AuthorityProfile";

function CitizenLayout() {
  const { role } = useApp();
  if (role !== "citizen") return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CitizenNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>);

}

function AuthorityLayout() {
  const { role } = useApp();
  if (role !== "authority") return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AuthorityNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>);

}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/citizen" element={<CitizenLayout />}>
        <Route index element={<CitizenDashboard />} />
        <Route path="report" element={<ReportProblem />} />
        <Route path="complaints" element={<MyComplaints />} />
        <Route path="complaints/:id" element={<ComplaintDetail />} />
        <Route path="issues" element={<MyCivicIssues />} />
        <Route path="issues/:id" element={<IssueDetail />} />
        {/*<Route path="notifications" element={<CitizenNotifications />} />*/}
        <Route path="profile" element={<CitizenProfile />} />
      </Route>

      <Route path="/authority" element={<AuthorityLayout />}>
        <Route index element={<AuthorityDashboard />} />
        <Route path="issues" element={<AuthorityIssues />} />
        <Route path="issues/:id" element={<AuthorityIssueDetail />} />
        <Route path="complaints" element={<AuthorityComplaints />} />
       {/* <Route path="map" element={<LocalityMap />} />*/}
        <Route path="resolved" element={<ResolvedIssues />} />
       {/* <Route path="notifications" element={<AuthorityNotifications />} />*/}
        <Route path="profile" element={<AuthorityProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>);

}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>);

}