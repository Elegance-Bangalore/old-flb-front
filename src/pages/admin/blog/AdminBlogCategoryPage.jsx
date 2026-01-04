import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar'
import BlogsCategory from '@/MainRoles/Admin/Features/ManageBlog/BlogsCategory'
import React from 'react'

function AdminBlogCategoryPage() {
  return (
    <div>
      <NewAdminSidebar>
        <BlogsCategory />
      </NewAdminSidebar>
    </div>
  )
}

export default AdminBlogCategoryPage