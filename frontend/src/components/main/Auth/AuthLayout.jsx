import { Outlet } from "react-router-dom";
import css from "./AuthLayout.module.css";

function AuthLayout() {
  return (
    <main id={css.main_area}>
      <div className={css.container}>
        <div className={css.welcome}>
          <h2>
            Welcome to <span>Ecommerce</span> App
          </h2>
        </div>
        <div className={css.outlet}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
