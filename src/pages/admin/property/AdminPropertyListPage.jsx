import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import Property from '@/MainRoles/Admin/Features/ManageProperty/AllPropertyList'
import React from 'react'

function AdminPropertyListPage() {
    return (
        <div>
            <NewAdminSidebar>
                <Property />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminPropertyListPage