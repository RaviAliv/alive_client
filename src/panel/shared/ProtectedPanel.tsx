import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedPanel() {
  const { isLoggedIn, initialized, user, hasCourseAccess } = useAuth();
  const navigate = useNavigate();

  const isStudent = isLoggedIn && user?.systemRole !== "admin" && user?.systemRole !== "superadmin";

  useEffect(() => {
    if (!initialized) return;
    if (!isLoggedIn) { navigate("/login", { replace: true }); return; }
    if (isStudent && hasCourseAccess === false) {
      navigate("/course/foundation/enroll", { replace: true });
    }
  }, [initialized, isLoggedIn, isStudent, hasCourseAccess, navigate]);

  if (!initialized || (isStudent && hasCourseAccess === null)) return (
    <div className="min-h-screen bg-[#0A0E16] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );

  if (!isLoggedIn) return null;
  if (isStudent && hasCourseAccess === false) return null;

  return <Outlet />;
}
