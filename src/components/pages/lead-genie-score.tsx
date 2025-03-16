import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import LeadGenieScoreDashboard from "../agent-testing/LeadGenieScoreDashboard";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";

const LeadGenieScorePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Lead Genie Score" />
        <main className="flex-1 overflow-auto">
          <LeadGenieScoreDashboard />
        </main>
      </div>
    </div>
  );
};

export default LeadGenieScorePage;
