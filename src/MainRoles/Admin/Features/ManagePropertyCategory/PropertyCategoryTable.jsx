import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Edit2, Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import {
    Box,
} from "@mui/material";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { deleteFaqApi, deletePropertyCategoryApi, propertyCategoryListApi, togglePropertyCategoryApi } from "@/ApiRoutes/AdminApi";
import DeleteModal from "@/components/Modals/DeleteModal";
import { toast } from "react-toastify";
import { FormControlLabel, Switch } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import { formatNumberInCr } from "@/CustomServices/Constant";


function PropertyCategoryTable({ editCategory, data, getCategoryList, loader }) {

    const [opan, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [categoryList, setCategoryList] = useState([])
    const [deleteId, setDeleteId] = useState("");

    async function toggleUserStatus(id) {
        try {
            const response = await togglePropertyCategoryApi(id);
            setCategoryList(prevList => {
                return prevList.map(cat => {
                    if (cat._id === id) {
                        return { ...cat, visible: !cat.visible };
                    }
                    return cat;
                });
            });
            toastMessage(200, "Status Changed Successfully")
        } catch (error) {
            throw error
        }
    }


    async function deleteCategory() {
        try {

            const response = await deletePropertyCategoryApi(deleteId);
            handleClose()
            getCategoryList()
        } catch (error) {
            toastMessage()
        }
    }

    const columns = [
        {
            field: "name", headerName: "Name", width: 350,
            renderCell: (params) => {
                return (
                    <Link to={`/admin/property-by-category-list/${params?.row?.name}/${params?.row?._id}`}>
                        <p className="mb-0 text-capitalize fs-16 cursor-pointer">{params?.row?.name}</p>
                    </Link>
                );
            },
        },
        {
            field: "order", headerName: "Order", width: 100,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{params?.row?.order}</p>
                );
            },
        },
        {
            field: "shortlistCount", headerName: "Shortlist Count", width: 150,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{params?.row?.shortlistCount}</p>
                );
            },
        },
        {
            field: "propertyView", headerName: "Property View", width: 150,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{params?.row?.propertyView}</p>
                );
            },
        },
        {
            field: "price", headerName: "Price", width: 120,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{formatNumberInCr(params?.row?.price)}</p>
                );
            },
        },
        {
            field: "days", headerName: "Days", width: 120,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{params?.row?.days}</p>
                );
            },
        },
        {
            field: "count", headerName: "Count", width: 120,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{params?.row?.count}</p>
                );
            },
        },
        {
            field: "visible",
            headerName: "Status",
            width: 200,
            renderCell: (params) => (
                <div className="text-start">
                    <FormControlLabel
                        control={
                            <Switch checked={params.row.visible} />}
                        labelPlacement="start"
                        onChange={() => toggleUserStatus(params.row._id)}

                    />
                </div>

            ),
        },

        {
            field: "edit",
            headerName: "Edit",
            width: 60,
            renderCell: (params) => (
                <button className="btn btn-profile-edit d-inline-block" onClick={() => editCategory(true, params.row)}>
                    <img className="img-fluid" src={editIcon} alt="editIcon" />
                </button>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 60,
            renderCell: (params) => (
                <button
                    className="btn btn-profile-delete d-inline-block"
                    onClick={() => { setOpen(true); setDeleteId(params.row._id) }}
                >
                    <img className="img-fluid" src={deleteIcon} alt="" />
                </button>
            ),
        },
    ];

    useEffect(() => {
        setCategoryList(data)
    }, [data])

    return (
        <>
            <div style={{ height: 600, width: '100%' }} className="custom-table-style">
                <DataGrid
                    rows={categoryList}
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
            <DeleteModal open={opan} handleClose={handleClose} deleteData={deleteCategory} />

        </>

    )
}

export default PropertyCategoryTable