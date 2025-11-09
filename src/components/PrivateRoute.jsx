import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

function PrivateRoute() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <LoadingSpinner />;
  return user ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
