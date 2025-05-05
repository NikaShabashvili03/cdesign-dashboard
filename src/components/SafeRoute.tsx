import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

function SafeRoute({ children }: { children: React.ReactNode }) {
  const { user, fetchProfile, isAuth, loading } = useAuthStore();

  useEffect(() => {
    if (!user && !loading) {
      fetchProfile();
    }
  }, [user, loading]);

  if (loading) {
    return <Loader/>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default SafeRoute;
