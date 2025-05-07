import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";

function SafeRoute({ children }: { children: React.ReactNode }) {
  const { user, fetchProfile, isAuth, loading } = useAuthStore();
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!user && !loading) {
      fetchProfile();
    }
  }, [user, loading]);

  if (loading) {
    return <Loader/>;
  }

  if (!isAuth) {
    return <Navigate to={`/${i18n.language}/login`} replace />;
  }

  return <>{children}</>;
}

export default SafeRoute;
