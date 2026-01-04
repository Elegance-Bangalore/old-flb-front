import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import EditBlogCategory from '@/MainRoles/Admin/Features/ManageBlog/EditBlogCategory'
import React from 'react'

function AdminEditBlogCategoryPage() {
  return (
    <NewAdminSidebar>
        <EditBlogCategory/>
    </NewAdminSidebar>
  )
}

export default AdminEditBlogCategoryPage