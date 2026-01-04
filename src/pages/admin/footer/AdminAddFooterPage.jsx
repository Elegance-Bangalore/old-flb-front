import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import AddFooter from '@/MainRoles/Admin/Features/ManageFooter/AddFooter'
import React from 'react'

function AdminAddFooterPage() {
    return (
        <div>
            <NewAdminSidebar>
                <AddFooter />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminAddFooterPage