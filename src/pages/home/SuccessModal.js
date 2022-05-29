import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SimpleModal from "../../primitives/modal/SimpleModal";

const SuccessModal = ({open, onClose}) => {
    return (
        <SimpleModal
            open={open}
            onClose={onClose}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                You voted!
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                <Button onClick={onClose}>Exit</Button>
            </Typography>
        </SimpleModal>
    );
};

export default SuccessModal;