import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedPanel() {
  const { isLoggedIn, initialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) return;
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [initialized, isLoggedIn, navigate]);

  if (!initialized) return (
    <div className="min-h-screen bg-[#0A0E16] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );

  if (!isLoggedIn) return null;

  return <Outlet />;
}
