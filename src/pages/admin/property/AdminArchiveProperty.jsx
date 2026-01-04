import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import ArchivePropertyList from '@/MainRoles/Admin/Features/ManageProperty/ArchivePropertyList'
import React from 'react'

function AdminArchiveProperty() {
    return (
        <div>
            <NewAdminSidebar>
                <ArchivePropertyList />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminArchiveProperty