import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import AgentTesting from "./components/pages/agent-testing";
import AgentPlaygroundPage from "./components/pages/agent-playground";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import LeadGenieScorePage from "./components/pages/lead-genie-score";
import MarketMatchPage from "./components/pages/market-match";
import ContractVistaPage from "./components/pages/contract-vista";
import DealCraftPage from "./components/pages/deal-craft";
import BriefVistaPage from "./components/pages/brief-vista";
import ContactVistaPage from "./components/pages/contact-vista";
import PDFPitchPage from "./components/pages/pdf-pitch";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent-testing"
          element={
            <PrivateRoute>
              <AgentTesting />
            </PrivateRoute>
          }
        />
        <Route
          path="/lead-genie-score"
          element={
            <PrivateRoute>
              <LeadGenieScorePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/market-match"
          element={
            <PrivateRoute>
              <MarketMatchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/contract-vista"
          element={
            <PrivateRoute>
              <ContractVistaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/deal-craft"
          element={
            <PrivateRoute>
              <DealCraftPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/brief-vista"
          element={
            <PrivateRoute>
              <BriefVistaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-vista"
          element={
            <PrivateRoute>
              <ContactVistaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/pdf-pitch"
          element={
            <PrivateRoute>
              <PDFPitchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent-playground"
          element={
            <PrivateRoute>
              <AgentPlaygroundPage />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
