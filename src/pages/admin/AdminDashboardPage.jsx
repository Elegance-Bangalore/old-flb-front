import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import AdminDashboard from '@/MainRoles/Admin/Features/Dashboard/AdminDashboard'
import React from 'react'

function AdminDashboardPage() {

    return (
        <NewAdminSidebar>
            <AdminDashboard />
        </NewAdminSidebar>
    )
}

export default AdminDashboardPage