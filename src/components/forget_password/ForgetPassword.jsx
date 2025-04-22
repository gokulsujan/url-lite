import React, { useState, useRef } from "react";
import {
    Container, TextField, Button, Typography, Box, Paper, Grid, CircularProgress, Link
} from "@mui/material";
import { useSnackbar } from "../utils/SnackbarComponent";
import api from "../../api/axios";
import { Link as RouterLink } from "react-router-dom"

const ForgotPasswordComponent = () => {
    const [phase, setPhase] = useState(1);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const showSnackbar = useSnackbar();
    const otpRefs = useRef([...Array(6)].map(() => React.createRef()));

    const handleSendOtp = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError("Enter a valid email address");
            return;
        }

        setEmailError("");
        setLoading(true);
        try {
            await api.post("/send-forget-password-otp", { email: email });
            showSnackbar("OTP sent to your email", "success", "bottom", "right");
            setPhase(2);
        } catch (error) {
            showSnackbar("Error sending OTP", "error", "bottom", "right");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            showSnackbar("Enter all 6 digits of OTP", "warning", "bottom", "right");
            return;
        }

        setLoading(true);
        try {
            await api.post("/verify-forget-password-otp", { email: email, otp: enteredOtp });
            showSnackbar("OTP verified", "success", "bottom", "right");
            setPhase(3);
        } catch (error) {
            showSnackbar("OTP verification failed", "error", "bottom", "right");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        const enteredOtp = otp.join("");
        if (password.length < 6 || password !== confirmPassword) {
            setPasswordError("Passwords must match and be at least 6 characters");
            return;
        }

        setPasswordError("");
        setLoading(true);
        try {
            await api.post("/change-password-via-otp", {
                email: email,
                otp: enteredOtp,
                password: password,
            });
            showSnackbar("Password reset successful", "success", "bottom", "right");
            window.location = "/login";
        } catch (error) {
            showSnackbar("Failed to reset password", "error", "bottom", "right");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1].current.focus();
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={10} sx={{ mt: 8, p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {phase === 1 && "Forgot Password"}
                    {phase === 2 && "Verify OTP"}
                    {phase === 3 && "Reset Password"}
                </Typography>

                {phase === 1 && (
                    <Box>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button fullWidth variant="contained" onClick={handleSendOtp} disabled={loading}>
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send OTP"}
                        </Button>
                    </Box>
                )}

                {phase === 2 && (
                    <Box>
                        <Typography align="center" sx={{ mb: 2 }}>Enter the 6-digit OTP sent to your email</Typography>
                        <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                            {otp.map((digit, idx) => (
                                <Grid item key={idx}>
                                    <TextField
                                        inputRef={otpRefs.current[idx]}
                                        inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: 20 } }}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(idx, e)}
                                        sx={{ width: 40 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button fullWidth variant="contained" onClick={handleVerifyOtp} disabled={loading}>
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Verify OTP"}
                        </Button>
                    </Box>
                )}

                {phase === 3 && (
                    <Box>
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            sx={{ mb: 2 }}
                        />
                        <Button fullWidth variant="contained" onClick={handleResetPassword} disabled={loading}>
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Reset Password"}
                        </Button>
                    </Box>
                )}
                <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
                    <Grid item>
                        <Link component={RouterLink} to="/signin">Sign in</Link>
                    </Grid>
                    <Grid item>
                        <Link component={RouterLink} to="/signup">Sign up</Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ForgotPasswordComponent;
