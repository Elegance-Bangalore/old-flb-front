import React, { useEffect, useState } from 'react'
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from '@/MainRoles/Admin/AdminLayouts/AdminMobileMenu';
import AdminSidebarMenu from '@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu';
import AddFooterSeoModal from './AddFooterSeoModal';
import FooterSeoTable from './FooterSeoTable';
import { getFooterSeoApi } from '@/ApiRoutes/AdminApi';

const FooterSeo = () => {
    // const [search, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [seoData, setSeoData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [editData, setEditData] = useState(null);


    function getEditData(seoData) {
        setEditData(seoData)
        setOpen(true)
    }

    const handleClose = () => { setOpen(false); setEditData(null) };

    async function getFooterSeo() {
        try {
            setLoader(true)
            const res = await getFooterSeoApi();
            // console.log("res", res.data.seoCity);
            setSeoData(res?.data?.seoCity);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        getFooterSeo();
    }, []);


    return (
        <>
            <div className="container-fluid ovh">
                <div className="row">
                    <div className="col-6">
                        <div className="breadcrumb_content">
                            <h2 className="breadcrumb_title pb-3">Footer SEO</h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="text-end">
                            <button className="btn-upgrade" type="button" onClick={() => setOpen(true)}>Add Seo</button>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <FooterSeoTable
                            //  query={search} 
                            seoData={seoData}
                            open={open}
                            handleClose={handleClose}
                            loader={loader}
                            getEditData={getEditData}
                            getFooterSeo={getFooterSeo}
                        />

                    </div>
                </div>
            </div>

            <AddFooterSeoModal open={open} handleClose={handleClose} editData={editData} getFooterSeo={getFooterSeo} />
        </>
    )
}

export default FooterSeo