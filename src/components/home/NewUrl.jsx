import { AddLink } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Paper, TextField, Typography, CircularProgress } from "@mui/material"
import { useState } from "react"
import { useSnackbar } from "../utils/SnackbarComponent"
import api from "../../api/axios"
import { useNavigate } from 'react-router-dom';

const NewurlComponent = () => {
    const [url, setUrl] = useState("")
    const [urlError, setUrlError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();
    const token = localStorage.getItem("access_token")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const pattern = /^(https?:\/\/)([\w.-]+)(:\d+)?(\/.*)?$/i; // URL pattern

        if (!pattern.test(url)) {
            setUrlError("Not a valid URL")
            return
        } else {
            setUrlError("")
        }
        setIsLoading(true)
        let data = {
            long_url: url
        }

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Origin': "https://app.urllite.in"
        }


        try {
            const response = await api.post("/api/v1/url/", data, { headers })
            if (response.status == 202) {
                showSnackbar("🎉 URL Generated", "success", "bottom", "right")
                let urlID = response.data.result.url.id
                navigate("/url/" + urlID)
            } else {
                showSnackbar(response.data.messages, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error.response.data.message, "error", "bottom", "right")
        }
        setIsLoading(false)
    }

    return (
        <Container maxWidth="sm" sx={{mb:9}}>
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: "auto",
                    bgcolor: 'secondary.main',
                    textAlign: "center",
                    mb: 1
                }}>
                    <AddLink />
                </Avatar>
                <Typography component='h1' variant="h5" sx={{ textAlign: 'center' }}>
                    Add New URL
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField placeholder="Paste your long url here" fullWidth required autoFocus sx={{ mb: 2 }} type='text'
                        value={url} error={!!urlError} onChange={(e) => setUrl(e.target.value)} helperText={urlError} />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={isLoading}>
                        {isLoading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Shorten URL'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
export default NewurlComponent
