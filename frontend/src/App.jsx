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
import { userProfile } from "./store/userAuthSlice";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  const { loading, success, data } = useSelector((store) => store.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(userProfile());
    }
  }, [accessToken, dispatch]);

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />

            <Route
              path="/"
              element={
                <AuthChecker isAuthenticated={success} user={data} loading={loading}>
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
                <AuthChecker isAuthenticated={success} user={data} loading={loading}>
                  <UserProfile />
                </AuthChecker>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <AuthChecker isAuthenticated={success} user={data} loading={loading}>
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
