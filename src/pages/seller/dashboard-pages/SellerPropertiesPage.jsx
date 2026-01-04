import PropertyListMain from '@/MainRoles/Seller/Features/ManageProperties/Components/PropertyList/PropertyListMain'
import SellerNewSidebar from '@/MainRoles/Seller/Layouts/SellerNewSideBar'
import React from 'react'

function SellerPropertiesPage() {
  return (
    <div>
      <SellerNewSidebar>
        <PropertyListMain />
      </SellerNewSidebar>
    </div>
  )
}

export default SellerPropertiesPage