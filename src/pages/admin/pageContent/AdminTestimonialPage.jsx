import React from "react";
import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import TestimonialMain from "@/MainRoles/Admin/Features/ManagePageContent/Testimonials/TestimonialMain";

function AdminTestimonialPage() {
  return (
    <NewAdminSidebar>
      <TestimonialMain />
    </NewAdminSidebar>
  );
}

export default AdminTestimonialPage;
