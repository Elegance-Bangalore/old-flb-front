import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

export default function ProfileAlertModal({ open, handleClose }) {

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                static
                onClose={() => null}
                aria-labelledby="alert-dialog-title"
                fullWidth
                disableScrollLock
                BackdropProps={{
                    onClick: stopPropagation
                }}
                disablebackdropclick
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='fw-bold'>
                    {"Complete Your Profile"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        <h4 className='fw-bold fs-20'>
                        Please complete your profile before posting your property.
                        </h4>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to={"/seller/my-profile"} className='text-white'>
                        <button className='btn btn-dark'>
                            Go to Profile
                        </button>
                    </Link>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
