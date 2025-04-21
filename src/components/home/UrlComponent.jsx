import { Box, Card, CardContent, CircularProgress, IconButton, Link, Skeleton, Tooltip, Typography } from "@mui/material"
import api from "../../api/axios"
import { useSnackbar } from "../utils/SnackbarComponent"
import { useState, useEffect } from "react";
import { AssessmentOutlined, CalendarMonthOutlined, ContentCopy, Delete, LanguageOutlined, Share } from "@mui/icons-material";
import DeleteButtonWithModal from "./DeleteButtonWithModal";
import ShareModal from "./ShareModal";

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
    const [isLoading, setIsLoading] = useState(true)

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

    const getTruncatedText = (text) => {
        const screenWidth = window.innerWidth;
        let maxLength = 20;

        if (screenWidth > 1200) {
            maxLength = 100;
        } else if (screenWidth > 768) {
            maxLength = 60;
        } else {
            maxLength = 10;
        }

        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };


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
                    if (response.data.result.url) {
                        setIsLoading(false)
                    }

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
        <>
            {isLoading ? (
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
                            <Skeleton variant="circular" width={40} height={40} animation="wave" />
                            <Skeleton variant="text" sx={{ fontSize: '1.6rem', width: 600 }} animation="wave" />

                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            < Tooltip title="Copy">
                                <Skeleton variant="rectangular" animation="wave" width={30} height={30} />
                            </Tooltip>

                            <Tooltip title="Share">
                                <Skeleton variant="rectangular" animation="wave" width={30} height={30} />
                            </Tooltip>

                            <Tooltip title="Delete">
                                <Skeleton variant="rectangular" animation="wave" width={30} height={30} />
                            </Tooltip>
                        </Box>
                    </CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1.4rem', width: 250, marginLeft: 2 }} animation="wave" />
                    <Skeleton variant="text" sx={{ fontSize: '1.4rem', width: 250, marginLeft: 2 }} animation="wave" />

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
                                    <Skeleton variant="text" sx={{ fontSize: '1.4rem', width: 90, marginLeft: 1 }} animation="wave" />
                                </Box>
                            </Typography>
                            <Typography variant="body2" noWrap>
                                <Box display="flex" alignItems="center">
                                    <CalendarMonthOutlined sx={{ position: 'relative', color: 'blue', top: '2px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1.4rem', width: 200, marginLeft: 1 }} animation="wave" />
                                </Box>
                            </Typography>
                        </Box>

                    </CardContent>
                </Card>
            ) : (
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
                            <Link href={"/url/" + id} sx={{textDecoration: 'none'}}>
                                <Typography variant="h6" noWrap>
                                    {getTruncatedText(title)}
                                </Typography>
                            </Link>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Tooltip title="Copy">
                                <IconButton onClick={handleCopy}>
                                    <ContentCopy color="action" />
                                </IconButton>
                            </Tooltip>

                            <ShareModal/>

                            <DeleteButtonWithModal urlId={id} />
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
                                    <AssessmentOutlined sx={{ position: 'relative', color: 'green', top: '2px', marginRight: 1 }} />
                                    {interactions} engagements
                                </Box>
                            </Typography>
                            <Typography variant="body2" noWrap>
                                <Box display="flex" alignItems="center">
                                    <CalendarMonthOutlined sx={{ position: 'relative', color: 'blue', top: '2px', marginRight: 1 }} />
                                    {createdAt}
                                </Box>
                            </Typography>
                        </Box>

                    </CardContent>
                </Card >
            )}


        </>



    )
}
export default UrlComponent
