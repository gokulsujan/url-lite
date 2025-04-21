import { Box, Card, Chip, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useSnackbar } from "../utils/SnackbarComponent";
import { useState, useEffect } from "react";
import api from "../../api/axios";

function formattedDate(dateStr) {
    let date = new Date(dateStr);
    let options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    };

    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

const UrlLogsComponent = ({ urlID }) => {
    const showSnackbar = useSnackbar();
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getStatusColor = (status) => {
        if (status >= 100 && status < 200) return 'info';
        if (status >= 200 && status < 300) return 'success';
        if (status >= 300 && status < 400) return 'primary';
        if (status >= 400 && status < 500) return 'warning';
        if (status >= 500) return 'error';
        return 'default';
    };

    useEffect(() => {
        const handleUrlLogsData = async () => {
            try {
                let response = await api.get("/api/v1/url/" + urlID + "/logs", {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    }
                })

                if (response.status == 200) {
                    if (response.data.result.logs != null) {
                        setLogs(response.data.result.logs)
                    }
                } else {
                    showSnackbar(response.data.message, "error", "bottom", "right")
                }
            } catch (error) {
                showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
            }
            setIsLoading(false)
        }

        if (urlID) {
            handleUrlLogsData()
        }
    }, [urlID])
    return (
        <Card sx={{
            width: "100%",
            maxHeight: "10cm",
            marginY: 2,
            overflow: "hidden",
        }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>DateTime</TableCell>
                            <TableCell>Client IP</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Http Status Code</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            logs.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell>{formattedDate(log.visited_at)}</TableCell>
                                    <TableCell>{log.client_ip}</TableCell>
                                    <TableCell>{log.city}</TableCell>
                                    <TableCell>{log.country}</TableCell>
                                    <TableCell><Chip
                                        label={log.http_status_code}
                                        color={getStatusColor(log.http_status_code)}
                                        sx={{ fontWeight: 'bold' }}
                                    /></TableCell>
                                    <TableCell>{log.redirect_status}</TableCell>
                                </TableRow>
                            ))

                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}
export default UrlLogsComponent
