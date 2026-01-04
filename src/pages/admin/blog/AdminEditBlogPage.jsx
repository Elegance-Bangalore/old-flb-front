import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import EditBlogs from '@/MainRoles/Admin/Features/ManageBlog/EditBlog'
import React from 'react'

function AdminEditBlogPage() {
    return (
        <NewAdminSidebar>
            <EditBlogs />
        </NewAdminSidebar>
    )
}

export default AdminEditBlogPage