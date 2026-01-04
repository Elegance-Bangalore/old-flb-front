import BuyerNewSidebar from '@/MainRoles/Buyer/BuyerLayout/BuyerNewSidebar'
import BuyerProfile from '@/MainRoles/Buyer/Features/ManageProfile/BuyerProfile'
import React from 'react'

function BuyerProfilePage() {
    return (
        <div>
            <BuyerNewSidebar>
                <BuyerProfile />
            </BuyerNewSidebar>
        </div>
    )
}

export default BuyerProfilePage