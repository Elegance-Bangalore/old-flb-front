import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Edit, Edit2, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";
import { deleteFooterSeoApi } from "@/ApiRoutes/AdminApi";

const FooterSeoTable = ({ seoData, getEditData, getFooterSeo, loader }) => {
    const [deleteId, setDeleteId] = useState("");  
    const [opan, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    async function deleteFooterSeo() { 
        try {
            const response = await deleteFooterSeoApi(deleteId);
            handleClose()
            getFooterSeo()
        } catch (error) { 
            toastMessage()
        }
    } 


    const columns = [
        { field: "title", headerName: "Title", width: 250 },
        { field: "propertyType", headerName: "Property Type", width: 250 },
        { field: "city", headerName: "City", width: 250 },
        {
            field: "edit",
            headerName: "Edit",
            width: 130,
            renderCell: (params) => (
                <button
                    onClick={() => getEditData(params.row)}
                    className="btn btn-profile-edit d-inline-block">
                    <Edit2 />
                </button>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 130,
            renderCell: (params) => (
                <button
                    onClick={() => { setDeleteId(params.row._id); setOpen(true); }}
                    className="btn btn-profile-delete d-inline-block"
                >
                    <Trash />
                </button >
            ),
        },
    ];
    return (
        <>
            <div style={{ height: 600, width: '100%' }} className="custom-table-style">
                <DataGrid
                    rows={seoData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowHeight={100}
                    pagination
                    className="custom-header"
                    pageSizeOptions={[10, 20]}
                    loading={loader}
                    loadingIndicator={<Box display="flex" justifyContent="center" alignItems="center" height="400px"><OnClickLoader /></Box>}
                    checkboxSelection
                />
            </div>
            <DeleteModal open={opan} handleClose={handleClose} deleteData={deleteFooterSeo} />
        </>
    )
}

export default FooterSeoTable