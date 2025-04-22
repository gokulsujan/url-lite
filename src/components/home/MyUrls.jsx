import { useEffect, useState } from "react"
import api from "../../api/axios"
import { useSnackbar } from "../utils/SnackbarComponent"
import UrlComponent from "./UrlComponent"
import { Box, Typography, Paper } from "@mui/material"

const MyUrlComponent = () => {
    const showSnackbar = useSnackbar()
    const [urls, setUrls] = useState([])

    useEffect(() => {
        const handleUserUrls = async () => {
            try {
                let response = await api.get("/api/v1/url/", {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    }
                })

                if (response.status === 200) {
                    if (response.data.result.urls != null) {
                        setUrls(response.data.result.urls)
                    } else {
                        showSnackbar(response.data.message, "error", "bottom", "right")
                    }
                } else if (response.status == 204) {
                    setUrls([])
                }
            } catch (error) {
                showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
            }
        }
        handleUserUrls()
    }, [])

    return (
        <div>
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    padding: "16px 0",
                    borderRadius: "12px",
                    backgroundColor: "#e3f2fd",
                    mb: 3
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="primary" align="center">
                    My URLs
                </Typography>
            </Paper>

            {urls.map((url) => (
                <UrlComponent key={url.id} id={url.id} />
            ))}
        </div>
    )
}

export default MyUrlComponent
