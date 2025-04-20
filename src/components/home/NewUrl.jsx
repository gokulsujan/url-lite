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
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*))\\.)+[a-z]{2,}' + // domain name
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

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
            'Origin': "http://localhost:5173"
        }


        try {
            const response = await api.post("/api/v1/url/", data, { headers })
            if (response.status == 202) {
                showSnackbar("🎉 URL Generated: " + response.data.result.url.short_url, "success", "bottom", "right")
            } else {
                showSnackbar(response.data.messages, "error", "bottom", "right")
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
