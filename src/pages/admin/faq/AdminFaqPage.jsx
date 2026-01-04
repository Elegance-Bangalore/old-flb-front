import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import FaqListPage from '@/MainRoles/Admin/Features/Faqs/Faqlistpage'
import React from 'react'

function AdminFaqPage() {
  return (
    <div>
      <NewAdminSidebar>
        <FaqListPage />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminFaqPage