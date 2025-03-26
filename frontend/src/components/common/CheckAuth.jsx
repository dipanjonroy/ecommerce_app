import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthChecker({ loading, isAuthenticated, user,isInitialize, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  

  useEffect(() => {    
    if (loading) return;

    const pathname = location.pathname;
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isAdminArea = pathname.startsWith("/admin");
    const isProfilePage = pathname === "/profile";

    console.log(isAuthenticated)

    if (isAuthenticated && isAuthPage) {
      navigate(user?.isAdmin ? "/admin/dashboard" : "/", { replace: true });
      return;
    }

    if (isAuthenticated && isProfilePage && user?.isAdmin) {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    if (isAuthenticated && isAdminArea && !user?.isAdmin) {
      navigate("/unauthorized", { replace: true });
      return;
    }

    

    if (!isAuthenticated && (isProfilePage || isAdminArea)) {
      navigate("/login", { replace: true,state: { from: location }});
      return;
    }

    
  }, [loading, location, isAuthenticated, user?.admin, navigate]);

 

  return (
    loading ? <div>Loading</div> : <div>{children}</div>
  );
}

export default AuthChecker;
