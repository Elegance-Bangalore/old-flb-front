import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLogout } from '@/Redux/Auth/authSlice';
import { removeCookie } from '@/CustomServices/GetCookies';



export default function LogoutModal({ open, handleClose }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        removeCookie("token");
        dispatch(setLogout(null));
        navigate("/login");
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                disableScrollLock
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure, You want to Logout?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleLogout()}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
