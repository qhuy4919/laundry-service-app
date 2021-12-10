import { AdminHeader } from "./header/header";
import { AdminSidebar } from "./sidebar/sidebar";
import { Sale } from "./admin-content/sale";
import "./admin.scss";

function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <AdminHeader />
      </div>
      <div className="admin-content">
        <AdminSidebar />
        <Sale />
      </div>
    </div>
  );
}

export default Admin;
