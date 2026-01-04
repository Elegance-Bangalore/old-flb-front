import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import AddBlogCategory from '@/MainRoles/Admin/Features/ManageBlog/AddBlogCategory'
import React from 'react'

function AdminAddBlogCategoryPage() {
    return (
        <NewAdminSidebar>
            <AddBlogCategory />
        </NewAdminSidebar>
    )
}

export default AdminAddBlogCategoryPage