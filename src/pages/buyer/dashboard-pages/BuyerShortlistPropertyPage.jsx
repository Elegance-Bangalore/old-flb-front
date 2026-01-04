import BuyerNewSidebar from '@/MainRoles/Buyer/BuyerLayout/BuyerNewSidebar'
import ShortlistPropertyMain from '@/MainRoles/Buyer/Features/Dashboard/ManageShortlistProperty/Components/ShortlistPropertyMain'
import React from 'react'

function BuyerShortlistPropertyPage() {
  return (
    <div>
      <BuyerNewSidebar>
        <ShortlistPropertyMain />
      </BuyerNewSidebar>
    </div>
  )
}

export default BuyerShortlistPropertyPage