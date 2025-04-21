import { Avatar, Box, Button, CircularProgress, Container, Paper, Skeleton, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import api from "../../api/axios"
import { useSnackbar } from "../utils/SnackbarComponent"


const ProfileComponent = () => {
    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [mobile, setMobile] = useState("")
    const [mobileError, setMobileError] = useState("")
    const showSnackbar = useSnackbar();
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)


    const handleSubmit = async (e) => {
        setIsUpdating(true)
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
        try {
            let data = {
                name: name,
                email: email,
                mobile: mobile
            }
            debugger
            let response = await api.put("/api/v1/user/" + userId, data, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 202) {
                showSnackbar("🎉 Update successful", "success", "bottom", "right")
            } else {
                showSnackbar(response.data.message, "warning", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        } finally {
            setIsUpdating(false)
        }
    }
    useEffect(() => {
        const handleProfileData = async () => {
            try {
                let response = await api.get("/api/v1/profile", {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    }
                })

                if (response.status == 200) {
                    setName(response.data.result.user.name)
                    setEmail(response.data.result.user.email)
                    setMobile(response.data.result.user.mobile)
                    setUserId(response.data.result.user.id)
                    setIsLoading(false)
                } else {
                }
            } catch (error) {
            }
        }
        handleProfileData()
    }, [])
    return (
        <Container maxWidth="sm">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: "auto",
                    bgcolor: 'secondary.main',
                    textAlign: "center",
                    mb: 1
                }} />
                <Typography component='h1' variant="h5" sx={{ textAlign: 'center' }}>
                    My Profile
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}>
                    {isLoading ? (
                        <>
                            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 2 }} />
                            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 2 }} />
                            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 2 }} />
                        </>
                    ) : (
                        <>
                            <TextField placeholder="Name" fullWidth required autoFocus sx={{ mb: 2 }} type='text' value={name}
                                onChange={(e) => setName(e.target.value)} error={!!nameError} helperText={nameError} />
                            <TextField placeholder="Email" fullWidth required autoFocus sx={{ mb: 2 }} type='email' value={email}
                                onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
                            <TextField placeholder="Mobile" fullWidth required autoFocus sx={{ mb: 2 }} type='text' value={mobile}
                                onChange={(e) => setMobile(e.target.value)} error={!!mobileError} helperText={mobileError} />
                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={isUpdating}>
                                {isUpdating ? (
                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                ) : (
                                    'Update'
                                )}
                            </Button>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    )
}

export default ProfileComponent
