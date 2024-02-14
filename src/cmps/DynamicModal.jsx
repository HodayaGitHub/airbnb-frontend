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
                    border: '1px solid #00000045',
                    borderRadius: '10px',
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    p: 4
                }}
            >
                {children}
            </Box>
        </Modal>
    );
};
