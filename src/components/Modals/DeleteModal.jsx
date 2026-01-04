import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


function DeleteModal({ open, handleClose, deleteData, propertyName, categoryName }) {

    return (
        <div>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    disableScrollLock>
                    <DialogTitle id="alert-dialog-title">
                        {propertyName && categoryName
                          ? (<span>Are you sure you want to remove <b>{propertyName}</b> from <b>{categoryName}</b> category?</span>)
                          : 'Are you sure?'}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteData}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default DeleteModal