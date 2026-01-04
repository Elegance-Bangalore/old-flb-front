import React, { useState } from 'react';
import { Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 

const ImagePopup = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <img className="img-fluid w-100" src={imageUrl} alt="Popup-image" onClick={handleOpen} style={{ cursor: 'pointer' }} />
      <Modal open={open} onClose={handleClose} disableScrollLock>
        <div className='w-75 h-75' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img className='img-fluid w-100 fl-img-4-2' src={imageUrl} alt="Popup" />
          <IconButton onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0, color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </div>
      </Modal>
    </div>
  );
};

export default ImagePopup;