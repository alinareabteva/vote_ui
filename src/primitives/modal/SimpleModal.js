import React from 'react';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SimpleModal = ({open, onClose, children = ''}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyle}>
                {children}
            </Box>
        </Modal>
    );
};

export default SimpleModal;