import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PanelIndex() {
  const { user } = useAuth();
  if (user?.systemRole === "superadmin") return <Navigate to="/panel/super" replace />;
  if (user?.systemRole === "admin") return <Navigate to="/panel/admin" replace />;
  return <Navigate to="/panel/my-courses" replace />;
}
