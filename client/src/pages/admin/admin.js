import { useState } from "react";
import { AdminHeader } from "./header/header";
import { AdminSidebar } from "./sidebar/sidebar";

import { Stats } from "./admin-content/statistics/Stats"
import { Shop } from "./admin-content/shops/Shop"
import { User } from "./admin-content/users/User"
import { Order } from "./admin-content/orders/Order"
import { Discount } from "./admin-content/discounts/Discount";
import { SIGNED_IN_USER } from "const/local-storage-key";
import "./admin.scss";

function Admin() {
  const [tab, setTab] = useState("statistics")
  const userCred = localStorage.getItem(SIGNED_IN_USER) ? JSON.parse(localStorage.getItem(SIGNED_IN_USER)).data.user : {role: 'guest'};

  return (
    <div className="admin-container">
        {/* <AdminHeader /> */}
        <AdminSidebar setTab={setTab} user={userCred}/>
        {
          {
            'statistics' : <Stats/>,
            'shops' : <Shop/>,
            'users' : <User/>,
            'orders' : <Order/>,
            'discounts' : <Discount/>,
          }[tab]
        }
    </div>
  );
}

export default Admin;
