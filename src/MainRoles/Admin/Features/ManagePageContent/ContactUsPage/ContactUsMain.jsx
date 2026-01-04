import React from 'react'
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from '@/MainRoles/Admin/AdminLayouts/AdminMobileMenu';
import AdminSidebarMenu from '@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu';
import ContactUsForm from './ContactUsForm';
import { Link } from 'react-router-dom';

function ContactUsMain() {
    return (
        <div className="container-fluid ovh">
            <div className="row">
                <div className="col-lg-6">
                    <div className="breadcrumb_content">
                        <h2 className="breadcrumb_title mt-5 mb-3 pb-3">Contact Us</h2>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className='mt-5 mb-3 text-end'>
                        <Link to="/contact">
                            <button className='btn-black'>Preview</button>
                        </Link>
                    </div>
                </div>
            </div>
            <ContactUsForm />
        </div>
    )
}

export default ContactUsMain