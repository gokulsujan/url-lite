import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Facebook, LinkedIn, Share, Twitter, WhatsApp } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '80%',   // phones
        sm: '70%',   // tablets
        md: '50%',   // desktops
    },
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: {
        xs: 2,
        sm: 3,
        md: 4,
    },
};

export default function ShareModal({ shortUrl }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const encodedUrl = encodeURIComponent(shortUrl);
    const message = encodeURIComponent("Check this out!");

    return (
        <div>
            <Tooltip title="Share">
                <IconButton onClick={handleOpen}>
                    <Share sx={{ color: '#DAA520' }} />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Share with
                    </Typography>
                    <Box
                        id="modal-modal-description"
                        sx={{
                            mt: 3,
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Tooltip title="WhatsApp">
                            <IconButton
                                component="a"
                                href={`https://api.whatsapp.com/send?text=${message}%20${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: '#25D366' }}
                            >
                                <WhatsApp />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Facebook">
                            <IconButton
                                component="a"
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: '#1877F2' }}
                            >
                                <Facebook />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="LinkedIn">
                            <IconButton
                                component="a"
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: '#0A66C2' }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Twitter">
                            <IconButton
                                component="a"
                                href={`https://twitter.com/intent/tweet?text=${message}&url=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: '#1DA1F2' }}
                            >
                                <Twitter />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
