import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import PropertyByCategory from '@/MainRoles/Admin/Features/ManagePropertyCategory/PropertyByCategory'
import React from 'react'

function AdminPropertyByCategoryPage() {
    return (
        <NewAdminSidebar>
            <PropertyByCategory />
        </NewAdminSidebar>
    )
}

export default AdminPropertyByCategoryPage