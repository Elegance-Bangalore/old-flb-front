import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import FaqAddPage from '@/MainRoles/Admin/Features/Faqs/FaqAddPage'
import React from 'react'

function AdminAddFaqPage() {
    return (
        <div>
            <NewAdminSidebar>
                <FaqAddPage />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminAddFaqPage