import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/main/Homepage";
import AuthLayout from "./components/main/Auth/AuthLayout";
import Register from "./components/main/Auth/Register";
import Login from "./components/main/Auth/Login";
import MainLayout from "./components/main/MainLayout";
import "remixicon/fonts/remixicon.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />

            <Route path="/" element={<AuthLayout />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
