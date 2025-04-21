import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Tooltip,
    Modal,
    Box,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import api from '../../api/axios';
import { useSnackbar } from "../utils/SnackbarComponent"
import { useNavigate } from 'react-router-dom';


const deleteModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '80%',
        sm: '60%',
        md: '30%',
    },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const DeleteButtonWithModal = ({ urlId }) => {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();





    return (
        <>
            <Tooltip title="Delete">
                <IconButton onClick={handleOpen}>
                    <Delete color="action" />
                </IconButton>
            </Tooltip>

            <Modal open={open} onClose={handleClose}>
                <Box sx={deleteModalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Confirm Deletion
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Are you sure you want to delete this url? This action cannot be undone.
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={""}
                            variant="contained"
                            color="error"
                            disabled={deleting}
                            startIcon={deleting && <CircularProgress size={20} color="inherit" />}
                        >
                            {deleting ? 'Deleting' : 'Delete'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default DeleteButtonWithModal;
