import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import BlogsTags from '@/MainRoles/Admin/Features/ManageBlog/BlogsTags'
import React from 'react'

function AdminBlogTagsPage() {
  return (

    <div>
      <NewAdminSidebar>
        <BlogsTags />
      </NewAdminSidebar>
    </div>

  )
}

export default AdminBlogTagsPage