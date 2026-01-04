import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import DeveloperAddPage from '@/MainRoles/Admin/Features/ManageDeveloper/DeveloperAddPage'
import React from 'react'

function AdminAddDeveloperProfilePage() {
    return (
        <div>
            <NewAdminSidebar>
                <DeveloperAddPage />
            </NewAdminSidebar>
        </div>
    )
}

export default AdminAddDeveloperProfilePage