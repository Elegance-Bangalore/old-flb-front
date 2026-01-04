import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadFileButton() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const apiurl = import.meta.env.VITE_BASE_API_URL;
    const url = `${apiurl}/admin/blog/upload/image`;

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const supportedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if (file && (file.type.startsWith('image/') || supportedVideoTypes.includes(file.type))) {
            const formData = new FormData();
            formData.append('image', file);
            setLoading(true);

            try {
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    const fileUrl = response.data.data.Location;
                    setFileUrl(fileUrl);
                    setOpen(true);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('Error uploading file');
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Invalid file type. Please upload an image or a supported video file.');
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fileUrl);
            toast.success('URL copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy URL:', error);
            toast.error('Failed to copy URL');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                component="label"
                variant="contained"
                startIcon={loading ? <CircularProgress size={24} /> : <CloudUploadIcon />}
                disabled={loading}
            >
                {loading ? 'Uploading...' : 'Upload file and Get URL'}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Dialog open={open} onClose={handleClose} disableScrollLock>
                <DialogTitle>File Uploaded Successfully</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>{fileUrl}</span>
                        <IconButton onClick={handleCopy} style={{ marginLeft: '10px' }}>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
