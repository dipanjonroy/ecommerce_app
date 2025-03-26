import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Homepage from "./pages/main/Homepage";
import AuthLayout from "./components/main/Auth/AuthLayout";
import Register from "./components/main/Auth/Register";
import Login from "./components/main/Auth/Login";
import MainLayout from "./components/main/MainLayout";
import "remixicon/fonts/remixicon.css";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard";
import UserProfile from "./pages/main/Profile";
import AuthChecker from "./components/common/CheckAuth";
import UnAuth from "./pages/common/unauth";
import NotFound from "./pages/common/notfound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authChecker } from "./store/userAuthSlice";

function App() {
  const { loading, isAuthenticated, userData , isInitialized} = useSelector((store)=>store.userAuth);
  const dispatch = useDispatch();

  useEffect(()=>{
    const authCheck = async()=>{
      try {
        await dispatch(authChecker())
      } catch (error) {
        console.log(error)
      }
    }

    authCheck()
  }, [ dispatch])

  if (!isInitialized) {
    return <div>Loading</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />

            <Route
              path="/"
              element={
                <AuthChecker
                  isAuthenticated={isAuthenticated}
                  user={userData}
                  loading={loading}
                >
                  <AuthLayout />
                </AuthChecker>
              }
            >
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route
              path="/profile"
              element={
                <AuthChecker
                  isAuthenticated={isAuthenticated}
                  user={userData}
                  loading={loading}
                >
                  <UserProfile />
                </AuthChecker>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <AuthChecker
                isAuthenticated={isAuthenticated}
                user={userData}
                loading={loading}
              >
                <AdminLayout />
              </AuthChecker>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="/unauthorized" element={<UnAuth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
