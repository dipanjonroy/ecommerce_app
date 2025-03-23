import { Routes, Route, BrowserRouter } from "react-router-dom";
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

function App() {
  const isAuth = false;
  const user = { isAdmin: false };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />

            <Route path="/" element={<AuthChecker isAuthenticated={isAuth} user={user}><AuthLayout /></AuthChecker>}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route
              path="/profile"
              element={
                <AuthChecker isAuthenticated={isAuth} user={user}>
                  <UserProfile />
                </AuthChecker>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <AuthChecker isAuthenticated={isAuth} user={user}>
                <AdminLayout />
              </AuthChecker>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="/unauthorized" element={<UnAuth/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
