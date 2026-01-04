import SubscriptionMain from "@/MainRoles/Seller/Features/ManageSubscription/Components/SubscriptionMain";
import SellerNewSidebar from "@/MainRoles/Seller/Layouts/SellerNewSideBar";
import React from "react";

function SellerManageSubscriptionPage() {
  return (
    <div>
      <SellerNewSidebar>
        <SubscriptionMain />
      </SellerNewSidebar>
    </div>
  );
}

export default SellerManageSubscriptionPage;
