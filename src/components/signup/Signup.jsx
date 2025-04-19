import { AddCircle } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Paper, TextField, Typography, Grid, Link as MaterialLink, CircularProgress } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { useState } from "react"
import api from "../../api/axios"
import { useSnackbar } from "../utils/SnackbarComponent"
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const [mobile, setMobile] = useState("")
    const [mobileError, setMobileError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (name.length < 3) {
            setNameError("Enter a valid name")
            return
        } else {
            setNameError("")
        }

        if (!emailPattern.test(email)) {
            setEmailError("Enter a valid email")
            return
        } else {
            setEmailError("")
        }

        if (isNaN(mobile) || mobile.length != 10) {
            setMobileError("Please give your 10 digit mobile number")
            return
        } else {
            setMobileError("")
        }

        if (password.length < 5) {
            setPasswordError("Password length should be more that 5 letters")
            return
        } else {
            setPasswordError("")
        }

        if (password != confirmPassword) {
            setConfirmPasswordError("Confirm password and password is not same")
            return
        } else {
            setConfirmPasswordError("")
        }

        setIsLoading(true)

        let data = {
            name: name,
            email: email,
            password: password,
            confirm_password: confirmPassword
        }

        let headers = {
            'Content-Type': 'application/json',
        }

        try {
            const response = await api.post("/signup", data, { headers });
            if (response.status == 202) {
                showSnackbar("🎉 Signup successful", "success", "bottom", "right")
                navigate("/signin")
            } else {
                showSnackbar(response.message, "error", "bottom", "right")

            }
        } catch (error) {
            showSnackbar(error.response.data.message, "error", "bottom", "right")
        }
        setIsLoading(false)
    }
    return (
        <Container maxWidth="sm" >
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: "auto",
                    bgcolor: 'secondary.main',
                    textAlign: "center",
                    mb: 1
                }}>
                    <AddCircle />
                </Avatar>
                <Typography component='h1' variant="h5" sx={{ textAlign: 'center' }}>
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField placeholder="Enter your full name" fullWidth required autoFocus sx={{ mb: 2 }} type='text'
                        value={name} error={!!nameError} onChange={(e) => setName(e.target.value)} helperText={nameError} />
                    <TextField placeholder="Enter your email id" fullWidth required sx={{ mb: 2 }} type='email'
                        value={email} error={!!emailError} onChange={(e) => setEmail(e.target.value)} helperText={emailError} />
                    <TextField placeholder="Enter your mobile number" fullWidth required sx={{ mb: 2 }} type='tel'
                        value={mobile} error={!!mobileError} onChange={(e) => setMobile(e.target.value)} helperText={mobileError} />
                    <TextField placeholder="Enter your password" fullWidth required sx={{ mb: 2 }} type='password'
                        value={password} error={!!passwordError} onChange={(e) => setPassword(e.target.value)} helperText={passwordError} />
                    <TextField placeholder="Confirm your password" fullWidth required sx={{ mb: 2 }} type='password'
                        value={confirmPassword} error={!!confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} helperText={confirmPasswordError} />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={isLoading}>
                        {isLoading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                    <Button type="reset" variant="contained" color="inherit" fullWidth sx={{ mt: 1 }}>
                        Reset
                    </Button>
                    <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
                        <Grid item>
                            <MaterialLink component={RouterLink} to="/forget-password">Forget Password</MaterialLink>
                        </Grid>
                        <Grid item>
                            <MaterialLink component={RouterLink} to="/signin">Sign in</MaterialLink>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default SignupComponent
