import { Box, Card, CardContent, CircularProgress, IconButton, Link, Tooltip, Typography } from "@mui/material"
import api from "../../api/axios"
import { useSnackbar } from "../utils/SnackbarComponent"
import { useState, useEffect } from "react";
import { AssessmentOutlined, CalendarMonthOutlined, ContentCopy, Delete, LanguageOutlined, Share } from "@mui/icons-material";

const UrlComponent = ({ id }) => {

    const showSnackbar = useSnackbar();
    const [title, setTitle] = useState("")
    const [faviconUrl, setFaviconUrl] = useState("")
    const [longUrl, SetLongUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [interactions, setInteractions] = useState(0)
    let baseUrl = api.defaults.baseURL;
    const [textToCopy, setTextToCopy] = useState("")

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            alert("Copied to clipboard!");
        } catch (err) {
            alert("Failed to copy.");
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ text: textToCopy });
        } else {
            alert("This feature is not yet released");
        }
    };

    function completeUrlForFavicon(url, baseUrl) {
        const isFullUrl = /^(http:\/\/|https:\/\/|www\.)/i.test(url);
        if (isFullUrl) {
            return url;
        }

        // Extract origin (protocol + domain) from base URL
        const { origin } = new URL(baseUrl);

        // Attach endpoint to origin
        return origin + '/' + url.replace(/^\/+/, '');
    }

    useEffect(() => {
        const handleUrlData = async () => {
            try {
                let response = await api.get("/api/v1/url/" + id, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    }
                })

                if (response.status === 200) {
                    setTitle(response.data.result.meta.title)
                    setFaviconUrl(completeUrlForFavicon(response.data.result.meta.favicon, response.data.result.url.LongUrl))
                    SetLongUrl(response.data.result.url.LongUrl)
                    setInteractions(response.data.result.meta.interactions)
                    setShortUrl(response.data.result.url.short_url)
                    setTextToCopy(baseUrl + "/" + response.data.result.url.short_url)

                    const date = new Date(response.data.result.url.created_at);
                    const options = {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Asia/Kolkata'
                    };

                    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
                    setCreatedAt(formattedDate)

                } else {
                    showSnackbar(response.data.message, "warning", "bottom", "right")
                }
            } catch (error) {
                showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
            }
        }

        if (id) {
            handleUrlData()
        }
    }, [id])

    return (
        <Card
            sx={{
                width: "100%",
                maxHeight: "10cm",
                marginY: 2,
                overflow: "hidden",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Box
                        component="img"
                        src={faviconUrl}
                        alt="favicon"
                        sx={{ width: 32, height: 32, flexShrink: 0 }}
                    />
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Tooltip title="Copy">
                        <IconButton onClick={handleCopy}>
                            <ContentCopy color="action" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Share">
                        <IconButton onClick={handleShare}>
                            <Share color="action" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton onClick="">
                            <Delete color="action" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
            <Link href={baseUrl + "/" + shortUrl} target="_blank" rel="noopener noreferrer" sx={{ marginLeft: 2 }}>
                {baseUrl}/{shortUrl}
            </Link>
            <br />
            <Link href={longUrl} target="_blank" rel="noopener noreferrer" sx={{
                marginLeft: 2,
                textDecoration: 'none',
                color: 'black',
                '&:hover': {
                    textDecoration: 'underline',
                },
            }}>
                {longUrl}
            </Link>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                <Box
                    display="flex"
                    justifyContent=""
                    alignItems="center"
                    gap={2}
                    sx={{ flexWrap: "wrap" }}
                >
                    <Typography variant="body2" noWrap>
                        <Box display="flex" alignItems="center">
                            <AssessmentOutlined sx={{ position: 'relative', color: 'green', top: '2px' }} />
                            {interactions} engagements
                        </Box>
                    </Typography>
                    <Typography variant="body2" noWrap>
                        <Box display="flex" alignItems="center">
                            <CalendarMonthOutlined sx={{ position: 'relative', color: 'blue', top: '2px' }} />
                            {createdAt}
                        </Box>
                    </Typography>
                </Box>

            </CardContent>
        </Card>


    )
}
export default UrlComponent
