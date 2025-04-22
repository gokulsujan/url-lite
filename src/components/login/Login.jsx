import { useState, useEffect } from 'react'
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material"
import {
    Avatar, Container, Paper, Typography, Box, TextField,
    FormControlLabel, Checkbox, Button, Grid, Link as MaterialLink,
    CircularProgress, IconButton
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { useSnackbar } from "../utils/SnackbarComponent"
import api from "../../api/axios"
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const showSnackbar = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    if (localStorage.getItem("access_token")) {
        useEffect(() => {
            navigate('/');
        }, [navigate]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address")
            return
        } else {
            setEmailError("")
        }

        if (password.length <= 5) {
            setPasswordError("Please enter a valid password")
            return
        } else {
            setPasswordError("")
        }

        setIsLoading(true)

        try {
            const data = {
                email: email,
                password: password
            }
            const headers = {
                'Content-Type': 'application/json'
            }
            const response = await api.post('/login', data);
            if (response.data.message == "No user found") {
                showSnackbar("Login failed: Invalid user credentials", "warning", "bottom", "right")
            }
            else if (response.data.message == "Incorrect Password") {
                showSnackbar("Login failed: Invalid user credentials", "warning", "bottom", "right")
            }
            else if (response.status == 200) {
                localStorage.setItem("access_token", response.data.access_token)
                if (response.data.verified_email != true) {
                    localStorage.setItem("not_verified_email", true)
                }
                showSnackbar("🎉 Login successful", "success", "bottom", "right")
                window.location = "/"
            } else {
                showSnackbar("Login failed: " + error, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar("⚠️ Network error: " + error, "error", "bottom", "right")
        } finally {
            setIsLoading(false);
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
                    <LockOutlined />
                </Avatar>
                <Typography component='h1' variant="h5" sx={{ textAlign: 'center' }}>
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField label="Email" placeholder="Enter your email" fullWidth required autoFocus sx={{ mb: 2 }}
                        type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError} helperText={emailError} />
                    <TextField label="Password" placeholder="Enter you password" fullWidth required type={showPassword ? "text" : "password"}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError} helperText={passwordError}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={isLoading}>
                        {isLoading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </Box>
                <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
                    <Grid item>
                        <MaterialLink component={RouterLink} to="/forget-password">Forget Password</MaterialLink>
                    </Grid>
                    <Grid item>
                        <MaterialLink component={RouterLink} to="/signup">Sign up</MaterialLink>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default LoginComponent
