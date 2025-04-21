import { MailLock } from "@mui/icons-material"
import { Avatar, Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import { useSnackbar } from "../utils/SnackbarComponent";

const SendEmailVerificationOtpComponent = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    useEffect(() => {
        const handleProfileData = async () => {
            try {
                const response = await api.get("/api/v1/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });

                if (response.status === 200) {
                    const user = response.data.result.user;
                    setEmail(user.email);
                    if (user.email == user.verified_email) {
                        showSnackbar("User email already verifed", "success", "bottom", "right")
                        navigate("/profile")
                    }
                }
            } catch (error) {
                showSnackbar("Error loading profile", "error", "bottom", "right");
            }
            setIsLoading(false)
        };
        handleProfileData();
    }, [])

    const handleSendOtp = async (e) => {
        e.preventDefault()
        setIsSending(true)
        const data = {
            email: email
        }
        try {
            const response = await api.post("/verify-email-otp", data);
            if (response.status == 200) {
                showSnackbar("🎉 OTP Delivered", "success", "bottom", "right")
                navigate("/verify-email")
            } else {
                showSnackbar(response.data.message, "warning", "bottom", "right");
                setIsSending(false)

            }
        } catch (error) {
            if (error.status == 429) {
                if (error.response.data.message) {
                    showSnackbar(error.response.data.message, "info", "bottom", "right");
                    setIsSending(false)

                } else {
                    showSnackbar("Rate limit exceeded", "info", "bottom", "right");
                    setIsSending(false)
                }
            } else {
                showSnackbar("Error while sending the otp", "error", "bottom", "right");
                setIsSending(false)
            }

        }
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: 'auto',
                    bgcolor: 'secondary.main',
                    textAlign: 'center',
                    mb: 1,
                }}>
                    <MailLock />
                </Avatar>
                <Typography component='h1' variant="h5" sx={{ textAlign: 'center' }}>
                    Send OTP to Email
                </Typography>
                <Box component="form"
                    onSubmit={handleSendOtp}
                    noValidate
                    sx={{ mt: 1 }}>
                    <TextField label="Email" placeholder="Enter your email" fullWidth required autoFocus sx={{ mb: 2 }}
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={isSending} >
                        {isSending ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Send'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container >
    )
}
export default SendEmailVerificationOtpComponent
