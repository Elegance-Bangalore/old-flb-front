import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import AddBlogs from '@/MainRoles/Admin/Features/ManageBlog/AddBlog'
import React from 'react'

function AdminAddBlogPage() {
    return (
        <NewAdminSidebar>
            <AddBlogs />
        </NewAdminSidebar>
    )
}

export default AdminAddBlogPage