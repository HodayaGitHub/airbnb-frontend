import { useState } from 'react'
import { Backdrop, Box, Modal, Fade } from '@mui/material';

export function DynamicModal({ open, onClose, children }) {
    
    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 520,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4
                }}
            >
                {children}
            </Box>
        </Modal>
    );
};
