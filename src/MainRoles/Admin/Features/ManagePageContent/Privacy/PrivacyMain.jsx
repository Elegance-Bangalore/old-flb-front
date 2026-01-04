import React from 'react'
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from '@/MainRoles/Admin/AdminLayouts/AdminMobileMenu';
import AdminSidebarMenu from '@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu';

function PrivacyMain() {
    return (

        <div>
            <Header />
            <AdminMobileMenu />

            <div className="dashboard_sidebar_menu">
                <div
                    className="offcanvas offcanvas-dashboard offcanvas-start"
                    tabIndex="-1"
                    id="DashboardOffcanvasMenu"
                    data-bs-scroll="true"
                >
                    <AdminSidebarMenu />
                </div>
            </div>

            <section className="our-dashbord dashbord ">
                <div className="container-fluid ovh">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb_content">
                                <h2 className="breadcrumb_title mt-5 mb-3 pb-3">Privacy and Policy Content</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default PrivacyMain