import { Outlet } from "react-router-dom";

function AdminLayout() {
  return ( <div>
    <div>Admin Layout</div>
    <Outlet/>
  </div> );
}

export default AdminLayout;