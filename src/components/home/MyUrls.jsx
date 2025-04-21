import { useEffect, useState } from "react"
import api from "../../api/axios"
import { useSnackbar } from "../utils/SnackbarComponent";
import UrlComponent from "./UrlComponent";
import { Link } from "react-router-dom";

const MyUrlComponent = () => {
    const showSnackbar = useSnackbar();
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const handleUserUrls = async () => {
            try {
                let response = await api.get("/api/v1/url/", {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    }
                });

                if (response.status === 200) {
                    if (response.data.result.urls != null) {
                        setUrls(response.data.result.urls);
                    } else {
                        showSnackbar(response.data.message, "error", "bottom", "right");
                    }
                }
            } catch (error) {
                showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right");
            }
        };
        handleUserUrls();
    }, []);

    return (
        <div>
            {urls.map((url, index) => (
                <UrlComponent id={url.id} />
            ))}
        </div>
    );
};

export default MyUrlComponent;
