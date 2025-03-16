import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import MarketMatchDashboard from "../agent-testing/MarketMatchDashboard";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";

const MarketMatch = () => {
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
        <Sidebar activeItem="MarketMatch" />
        <main className="flex-1 overflow-auto">
          <MarketMatchDashboard />
        </main>
      </div>
    </div>
  );
};

export default MarketMatch;
