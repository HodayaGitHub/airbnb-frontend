import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FilterIcon } from '../../services/icons.service.jsx'

export function StayFilter() {

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }



    return (
        <div>
            <div className="filter-btn" onClick={handleOpen}>
                <FilterIcon />
                <span> Filter </span>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button onClick={handleClose}> x </button>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}



// import React from "react"
// import { DynamicModal } from '../DynamicModal.jsx'
// import { FilterIcon } from '../../services/icons.service.jsx'



// export function StayFilter() {
//     const [modalShown, toggleModal] = React.useState(false)

//     return (
//         <div className="dynamic-modal">

//             <div className="filter-btn" onClick={() => { toggleModal(!modalShown) }}>
//                 <FilterIcon />
//                 <span> Filter </span>
//             </div>

//             <DynamicModal shown={modalShown} close={() => { toggleModal(false) }}>

//                 <h1>Look! I'm inside the modal!</h1>

//             </DynamicModal>
//         </div>
//     )
// }
