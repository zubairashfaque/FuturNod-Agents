import React from "react";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";
import ContactVistaDashboard from "../agent-testing/ContactVistaDashboard";
import Sidebar from "../dashboard/layout/Sidebar";

const ContactVistaPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="ContactVista" />
      <main className="flex-1 overflow-auto">
        <ContactVistaDashboard />
      </main>
    </div>
  );
};

export default ContactVistaPage;
