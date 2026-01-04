import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import PropertyCategoryList from '@/MainRoles/Admin/Features/ManagePropertyCategory/PropertyCategoryList'
import React from 'react'

function AdminPropertyCategoryPage() {
    return (
        <NewAdminSidebar>
            <PropertyCategoryList />
        </NewAdminSidebar>
    )
}

export default AdminPropertyCategoryPage