import React from "react";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";
import BriefVistaDashboard from "../agent-testing/BriefVistaDashboard";
import Sidebar from "../dashboard/layout/Sidebar";

const BriefVistaPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="BriefVista" />
      <main className="flex-1 overflow-auto">
        <BriefVistaDashboard />
      </main>
    </div>
  );
};

export default BriefVistaPage;
