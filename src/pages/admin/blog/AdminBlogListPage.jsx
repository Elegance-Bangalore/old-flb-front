import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import BlogManage from "@/MainRoles/Admin/Features/ManageBlog/BlogManage";
import React from "react";

function AdminBlogListPage() {
  return (
    <div>
      <NewAdminSidebar>
        <BlogManage />
      </NewAdminSidebar>
    </div>
  );
}

export default AdminBlogListPage;
