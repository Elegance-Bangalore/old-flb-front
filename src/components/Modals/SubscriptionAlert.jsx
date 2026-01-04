import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '@/Redux/Auth/authSlice';
import { Send2 } from 'iconsax-react';
import { styled } from '@mui/system';


export default function SubscriptionAlert({ open, message, handleClose, close = true }) {

    const BlackButton = styled(Button)(({ theme }) => ({
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: 'black',
        },
    }));


    const user = useSelector(selectUser);
    const navigate = useNavigate()

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const email = "info@farmlandbazaar.com";
    const subject = encodeURIComponent("Popup on Farmland Bazaar");
    const body = encodeURIComponent(`Hello,\n\nI am writing regarding the following alert:\n\n${message} at info@farmlandbazaar.com \n\nPlease assist me with this issue.\n\nUser Details:\nName: ${user?.fullName}\nPhone: ${user?.phone}\n\nThank you.`);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`

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
                <DialogTitle id="alert-dialog-title" className='fw-bold text-danger py-2' style={{ backgroundColor: "#ff00001c" }}>
                    {"Upgrade to Post More Properties"}
                </DialogTitle>

                <DialogContent className='pb-1' dividers>
                    <DialogContentText id="alert-dialog-description" >
                        <h4>{message}</h4>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BlackButton onClick={handleClose}><p className='m-0 fs-16 text-white fw-bold'>Cancel</p> </BlackButton>
                    <BlackButton onClick={()=>navigate("/subscription-plan")}><p className='m-0 fs-16 text-white fw-bold'>Upgrade</p> </BlackButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
