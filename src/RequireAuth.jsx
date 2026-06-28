import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const user = sessionStorage.getItem("BOOKLET_USER");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
