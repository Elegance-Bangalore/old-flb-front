import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import PostPropertyAdmin from '@/MainRoles/Admin/Features/ManageProperty/PostPropertyAdmin'
import React from 'react'

function AdminAddPropertyPage() {
    return (
        <div>
            <NewAdminSidebar>
                <PostPropertyAdmin />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminAddPropertyPage