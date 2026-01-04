import SellerDashboard from '@/MainRoles/Seller/Features/ManageDashboard/SellerDashboard'
import SellerNewSidebar from '@/MainRoles/Seller/Layouts/SellerNewSideBar'
import React from 'react'

function SellerDashboardPage() {
    return (
        <SellerNewSidebar>
            <SellerDashboard />
        </SellerNewSidebar>
    )
}

export default SellerDashboardPage