import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { DocumentCopy, Edit2, Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import {
    Box,
} from "@mui/material";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { deleteFaqApi, deleteUserApi, getUsersListApi, toggleUserStatusApi } from "@/ApiRoutes/AdminApi";
import DeleteModal from "@/components/Modals/DeleteModal";
import { FormControlLabel, Switch } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";



export default function UserListTable() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [deleteId, setDeleteId] = useState("");

    const [loader, setLoader] = useState(false);
    const [userList, setUserList] = useState([])

    async function getUserList() {
        try {
            setLoader(true)
            const response = await getUsersListApi();
            setUserList(response?.data?.response)
        } catch (error) {
            toastMessage(400, "Something went wrong")
            throw error
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        getUserList()
    }, [])



    async function toggleUserStatus(id) {
        try {
            const response = await toggleUserStatusApi(id);
            const updatedUserList = userList.map(user => {
                if (user._id === id) {
                    return { ...user, status: !user.status };
                }
                return user;
            });
            toastMessage(200, "Status Changed Successfully")
            setUserList(updatedUserList);
        } catch (error) {
            throw error
        }
    }

    const columns = [
        {
            field: "username", headerName: "Username", width: 250,
            renderCell: (params) => {
                return (
                    <p className="mb-0 text-capitalize fs-16">{params?.row?.username}</p>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 350,
            renderCell: (params) => (
                <p className="text-dark fs-16">{params?.row?.email} </p>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            width: 300,
            renderCell: (params) => (
                <FormControlLabel
                    control={
                        <Switch checked={params.row.status} />}
                    labelPlacement="start"
                    onChange={() => toggleUserStatus(params.row._id)}

                />
            ),
        },

        {
            field: "edit",
            headerName: "Edit",
            width: 60,
            renderCell: (params) => (
                <Link to='/admin/user-edit-page' state={params.row}>
                    <button className="btn btn-profile-edit d-inline-block">
                        <Edit2
                            size="20"
                        />
                    </button>
                </Link>
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
                    <Trash
                        size="20"
                    />
                </button>
            ),
        },
    ];

    async function deleteUser() {
        try {
            const response = await deleteUserApi(deleteId);
            handleClose()
            getUserList()
        } catch (error) {
            toastMessage()
        }
    }

    return (
        <>
            <div style={{ height: 600, width: '100%' }} className="custom-table-style">
                <DataGrid
                    rows={userList}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowHeight={100}
                    pagination
                    className="custom-header"
                    pageSizeOptions={[10, 20]}
                    checkboxSelection
                    loading={loader}
                    loadingIndicator={<Box display="flex" justifyContent="center" alignItems="center" height="400px"><OnClickLoader /></Box>}
                    cellSelection={false}
                    disableRowSelectionOnClick

                />
            </div>
            <DeleteModal open={open} handleClose={handleClose} deleteData={deleteUser} />
        </>

    );
}