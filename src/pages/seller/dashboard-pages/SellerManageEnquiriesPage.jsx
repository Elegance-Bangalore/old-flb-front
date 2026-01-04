import ManageEnquiryMain from '@/MainRoles/Seller/Features/ManageEnquiries/Components/ManageEnquiryMain'
import SellerNewSidebar from '@/MainRoles/Seller/Layouts/SellerNewSideBar'
import React from 'react'

function SellerManageEnquiriesPage() {
  return (
    <SellerNewSidebar>
      <ManageEnquiryMain />
    </SellerNewSidebar>
  )
}

export default SellerManageEnquiriesPage