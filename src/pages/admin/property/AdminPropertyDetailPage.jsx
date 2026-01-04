import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import AdminPropertyDetail from '@/MainRoles/Admin/Features/ManageProperty/AdminPropertyDetail'
import React from 'react'

function AdminPropertyDetailPage() {
    return (
        <div>
            <NewAdminSidebar>
                <AdminPropertyDetail />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminPropertyDetailPage