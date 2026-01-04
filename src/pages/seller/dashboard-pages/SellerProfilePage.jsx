import ProfileMain from '@/MainRoles/Seller/Features/ManageProfile/Components/SellerProfileMain'
import SellerNewSidebar from '@/MainRoles/Seller/Layouts/SellerNewSideBar'
import React from 'react'

function SellerProfilePage() {
  return (
    <SellerNewSidebar>
      <ProfileMain />
    </SellerNewSidebar>
  )
}

export default SellerProfilePage