import BuyerNewSidebar from '@/MainRoles/Buyer/BuyerLayout/BuyerNewSidebar'
import OwnersContactedMain from '@/MainRoles/Buyer/Features/Dashboard/OwnerContacted/OwnersContactedMain'
import React from 'react'

function BuyerOwnersContractedPage() {
    return (
        <div>
            <BuyerNewSidebar>
                <OwnersContactedMain />
            </BuyerNewSidebar>
        </div>
    )
}

export default BuyerOwnersContractedPage