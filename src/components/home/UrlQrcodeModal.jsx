import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Button, Tooltip } from '@mui/material';
import {
    QrCode2, Instagram, WhatsApp, Facebook, LinkedIn, Twitter, Download
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '80%',
        sm: '70%',
        md: '50%',
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
    textAlign: 'center'
};

export default function UrlQrCodeModal({ shortUrl }) {
    const [open, setOpen] = React.useState(false);
    const qrRef = React.useRef();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDownload = async () => {
        if (qrRef.current) {
            const dataUrl = await htmlToImage.toPng(qrRef.current);
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = dataUrl;
            link.click();
        }
    };

    const shareOn = async (platform) => {
        if (!navigator.canShare || !navigator.canShare({ files: [] })) {
            alert("Sharing not supported on this browser.");
            return;
        }

        const dataUrl = await htmlToImage.toPng(qrRef.current);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'qr-code.png', { type: 'image/png' });

        const shareData = {
            title: 'QR Code',
            text: 'Check out this QR code!',
            files: [file]
        };

        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error("Error sharing", err);
        }
    };

    return (
        <div>
            <Tooltip title="Show QR Code">
                <IconButton onClick={handleOpen} sx={{ color: '#1976d2' }}>
                    <QrCode2 />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="qr-code-modal-title"
                aria-describedby="qr-code-modal-description"
            >
                <Box sx={style}>
                    <Typography id="qr-code-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
                        Scan the QR Code
                    </Typography>

                    <Box ref={qrRef} sx={{ display: 'inline-block', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
                        <QRCodeSVG
                            value={shortUrl}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                            includeMargin={true}
                        />
                    </Box>

                    <Typography sx={{ mt: 2, wordBreak: 'break-all', fontSize: 14, color: 'text.secondary' }}>
                        {shortUrl}
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<Download />}
                        onClick={handleDownload}
                        sx={{ mt: 2 }}
                    >
                        Download PNG
                    </Button>

                    <Box sx={{
                        mt: 3,
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 2,
                    }}>
                        <Tooltip title="Instagram">
                            <IconButton onClick={() => shareOn('instagram')} sx={{ color: '#E4405F' }}>
                                <Instagram />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="WhatsApp">
                            <IconButton onClick={() => shareOn('whatsapp')} sx={{ color: '#25D366' }}>
                                <WhatsApp />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Facebook">
                            <IconButton onClick={() => shareOn('facebook')} sx={{ color: '#1877F2' }}>
                                <Facebook />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="LinkedIn">
                            <IconButton onClick={() => shareOn('linkedin')} sx={{ color: '#0A66C2' }}>
                                <LinkedIn />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Twitter">
                            <IconButton onClick={() => shareOn('twitter')} sx={{ color: '#1DA1F2' }}>
                                <Twitter />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
