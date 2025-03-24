import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthChecker({ isAuthenticated, user, children }) {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated){
      if(user?.isAdmin){
        if(location.pathname.includes("profile") || location.pathname.includes("login") || location.pathname.includes("register")){
          navigate("/admin/dashboard", { replace: true })
        }
      }

      if(!user?.isAdmin){
        if(location.pathname.includes("admin") || location.pathname.includes("login") || location.pathname.includes("register")){
          navigate("/",{ replace: true })
        }
      }
    }

    if(!isAuthenticated){
      if(location.pathname.includes("profile") || location.pathname.includes("admin")){
        navigate("/login",{ replace: true })
      }
    }
  },[isAuthenticated, user, location.pathname, navigate])
  
  return <>{children}</>;
}

export default AuthChecker;
