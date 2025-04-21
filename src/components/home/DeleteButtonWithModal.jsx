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

    const handleDelete = async () => {
        setDeleting(true)
        try {
            let response = await api.delete("/api/v1/url/" + urlId, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 200) {
                showSnackbar("Url Deleted successfully", "success", "bottom", "right")
                const isOnHomePage = window.location.pathname === "/";
                if (isOnHomePage) {
                    window.location.reload();
                } else {
                    navigate("/", { replace: true });
                }

            } else {
                showSnackbar(response.data.message, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        } finally {
            setDeleting(false)
        }
    }


    return (
        <>
            <Tooltip title="Delete">
                <IconButton onClick={handleOpen}>
                    <Delete color="error" />
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
                            onClick={handleDelete}
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
