import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


function UnsavedChangesModal({ open, handleClose, url, postProperty }) {

    const navigate = useNavigate();
    function saveDraft() {
        postProperty()
        navigate(url)
    }

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
                        You have some unsaved changes? Do you want to Save as Draft?
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => saveDraft()}>
                            Save as Draft
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default UnsavedChangesModal