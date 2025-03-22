import { Navigate, useLocation } from "react-router-dom";

function AuthChecker({ isAuthenticated, user, children }) {
  const location = useLocation();

  if(!isAuthenticated){
    if(location.pathname === "/profile" || location.pathname.includes("admin")){
      return <Navigate to="/login"/>
    }
  }

  if(isAuthenticated) {

   if(location.pathname ==="/profile"){
      if(user?.isAdmin){
        return <Navigate to="/admin/dashboard"/>
      } 
    }

    if(location.pathname.includes("admin")){
      if(!user?.isAdmin){
        return <Navigate to="/unauthorized"/>
      }
    }

    if(location.pathname ==="/login" || location.pathname === "/register"){
      if(user?.isAdmin){
        return <Navigate to="/admin/dashboard"/>
      } else {
        return <Navigate to="/"/>
      }
    }
  }

  return <>{children}</>;
}

export default AuthChecker;
