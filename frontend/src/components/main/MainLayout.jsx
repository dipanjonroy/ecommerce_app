import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer/>
    </div>
  );
}

export default MainLayout;
