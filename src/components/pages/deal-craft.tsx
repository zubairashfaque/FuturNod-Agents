import React from "react";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";
import DealCraftDashboard from "../agent-testing/DealCraftDashboard";
import Sidebar from "../dashboard/layout/Sidebar";

const DealCraftPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="DealCraft" />
      <main className="flex-1 overflow-auto">
        <DealCraftDashboard />
      </main>
    </div>
  );
};

export default DealCraftPage;
