import {
    TextField,
    FormControl,
} from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsersListApi } from "@/ApiRoutes/AdminApi";
import UserListTable from "./UserListTable";
import { toastMessage } from "@/CustomServices/ToastMessage";


const UserListPage = () => {

    const [loader, setLoader] = useState(false);
    const [userList, setUserList] = useState([])

    async function getUserList() {
        try {
            setLoader(true)
            const response = await getUsersListApi();
            setUserList(response?.data?.response)
        } catch (error) {
            toastMessage(422, "Something went wrong")
            throw error
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        getUserList()
    }, []);

    return (
        <>
            <div className="container-fluid ovh">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb_content">
                            <h2 className="breadcrumb_title pb-3">USERS</h2>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div>
                            <form className="row mb-3">
                                <div className="col-md-12">
                                    <div className="text-end">
                                        <Link to="/admin/user-add-page">
                                            <button className="btn-upgrade w-100-mobile" type="button">ADD USER</button>
                                        </Link>

                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-md-12">
                                    <UserListTable userList={userList} loader={loader} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserListPage;
