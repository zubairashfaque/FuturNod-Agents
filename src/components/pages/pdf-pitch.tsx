import React from "react";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";
import PDFPitchDashboard from "../agent-testing/PDFPitchDashboard";
import Sidebar from "../dashboard/layout/Sidebar";

const PDFPitchPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="PDFPitch" />
      <main className="flex-1 overflow-auto">
        <PDFPitchDashboard />
      </main>
    </div>
  );
};

export default PDFPitchPage;
