import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { Verified } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import { useSnackbar } from "../utils/SnackbarComponent";
import { useNavigate } from "react-router-dom";

const VerifyEmailOtpComponent = () => {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [email, setEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const inputsRef = useRef([]);
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            inputsRef.current[0]?.focus();
        }
    }, [isLoading]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length < 6) {
            showSnackbar("Please enter all 6 digits", "warning", "bottom", "right");
            return;
        }

        setIsVerifying(true);

        try {
            debugger
            const response = await api.post("/verify-email", { email: email, otp: otpCode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.status === 200) {
                showSnackbar("🎉 Email verified successfully", "success", "bottom", "right");
                localStorage.removeItem("not_verified_email")
                navigate("/profile");
            } else {
                showSnackbar(response.data.message || "OTP verification failed", "error", "bottom", "right");
            }
        } catch (error) {
            showSnackbar(error?.response?.data?.message || "Something went wrong", "error", "bottom", "right");
        } finally {
            setIsVerifying(false);
        }
    };

    if (isLoading) {
        return (
            <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: 'auto',
                    bgcolor: 'primary.main',
                    textAlign: 'center',
                    mb: 1,
                }}>
                    <Verified />
                </Avatar>
                <Typography component="h1" variant="h5" textAlign="center">
                    Enter OTP
                </Typography>
                <Typography variant="body2" textAlign="center" mb={2}>
                    Sent to: <strong>{email}</strong>
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Box display="flex" justifyContent="center" gap={1} mb={2}>
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                inputRef={el => inputsRef.current[index] = el}
                                value={digit}
                                onChange={e => handleChange(e, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                inputProps={{
                                    maxLength: 1,
                                    style: { textAlign: "center", fontSize: "1.5rem", width: "3rem" }
                                }}
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isVerifying}
                    >
                        {isVerifying ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "Verify OTP"
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default VerifyEmailOtpComponent;
