import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Suspense, lazy, useEffect } from "react";

import Index from "./pages/Index.tsx";

const Login = lazy(() => import("./pages/Login.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Achievements = lazy(() => import("./pages/Achievements.tsx"));
const Timeline = lazy(() => import("./pages/Timeline.tsx"));
const Badges = lazy(() => import("./pages/Badges.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const AcademicRecord = lazy(() => import("./pages/AcademicRecord.tsx"));
const ResumeAnalyzer = lazy(() => import("./pages/ResumeAnalyzer.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const ContactStatic = lazy(() => import("./pages/ContactStatic.tsx"));

const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const UserManagement = lazy(() => import("./pages/UserManagement.tsx"));
const ManageEntries = lazy(() => import("./pages/ManageEntries.tsx"));
const Leaderboard = lazy(() => import("./pages/Leaderboard.tsx"));
const FlaggedEntries = lazy(() => import("./pages/FlaggedEntries.tsx"));
const AdminFeedback = lazy(() => import("./pages/AdminFeedback.tsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>}>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact-static" element={<ContactStatic />} />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'faculty']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/achievements" element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'faculty']}>
                <Achievements />
              </ProtectedRoute>
            } />
            <Route path="/timeline" element={
               <ProtectedRoute allowedRoles={['student']}>
                 <Timeline />
               </ProtectedRoute>
            } />
            <Route path="/badges" element={
               <ProtectedRoute allowedRoles={['student']}>
                 <Badges />
               </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
               <ProtectedRoute allowedRoles={['student']}>
                 <Portfolio />
               </ProtectedRoute>
            } />
            <Route path="/academic-record" element={
               <ProtectedRoute allowedRoles={['student']}>
                 <AcademicRecord />
               </ProtectedRoute>
            } />
            <Route path="/resume-analyzer" element={
               <ProtectedRoute allowedRoles={['student']}>
                 <ResumeAnalyzer />
               </ProtectedRoute>
            } />
            <Route path="/settings" element={
               <ProtectedRoute allowedRoles={['student', 'admin', 'faculty']}>
                 <Settings />
               </ProtectedRoute>
            } />
            <Route path="/contact" element={
               <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
                 <Contact />
               </ProtectedRoute>
            } />
            <Route path="/admin" element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <AdminDashboard />
               </ProtectedRoute>
            } />
            <Route path="/users" element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <UserManagement />
               </ProtectedRoute>
            } />
            <Route path="/achievements-manage" element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <ManageEntries />
               </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <Leaderboard />
               </ProtectedRoute>
            } />
            <Route path="/flags" element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <FlaggedEntries />
               </ProtectedRoute>
            } />
            <Route path="/admin-feedback" element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <AdminFeedback />
               </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
