import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Skeleton,
    TextField,
    InputAdornment,
    Tooltip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../../api/axios";
import { useSnackbar } from "../utils/SnackbarComponent";

const MyProfileComponent = () => {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mobile, setMobile] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const showSnackbar = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 3) {
            setNameError("Enter a valid name");
            return;
        } else {
            setNameError("");
        }

        if (!emailPattern.test(email)) {
            setEmailError("Enter a valid email");
            return;
        } else {
            setEmailError("");
        }

        if (isNaN(mobile) || mobile.length !== 10) {
            setMobileError("Please give your 10 digit mobile number");
            return;
        } else {
            setMobileError("");
        }

        setIsUpdating(true);
        try {
            const data = { name, email, mobile };
            const response = await api.put(`/api/v1/user/${userId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (response.status === 202) {
                showSnackbar("🎉 Update successful", "success", "bottom", "right");
            } else {
                showSnackbar(response.data.message, "warning", "bottom", "right");
            }
        } catch (error) {
            showSnackbar(
                error?.response?.data || "Something went wrong",
                "error",
                "bottom",
                "right"
            );
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        const handleProfileData = async () => {
            try {
                const response = await api.get("/api/v1/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                if (response.status === 200) {
                    const user = response.data.result.user;
                    debugger
                    setName(user.name);
                    setEmail(user.email);
                    setMobile(user.mobile);
                    setUserId(user.id);
                    setIsEmailVerified(user.email == user.verified_email);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                showSnackbar("Error loading profile", "error", "bottom", "right");
            }
        };
        handleProfileData();
    }, [showSnackbar]);

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mx: "auto", mt: 4 }}>
            {isLoading ? (
                <>
                    <Skeleton height={56} sx={{ borderRadius: 1, mb: 2 }} />
                    <Skeleton height={56} sx={{ borderRadius: 1, mb: 2 }} />
                    <Skeleton height={56} sx={{ borderRadius: 1, mb: 2 }} />
                </>
            ) : (
                <>
                    <TextField
                        label="Name"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!nameError}
                        helperText={nameError}
                    />

                    <TextField
                        label="Email"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isEmailVerified ? (
                                        <Tooltip title="Email verified">
                                            <CheckCircleIcon color="success" />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Email not verified">
                                            <CancelIcon color="error" />
                                        </Tooltip>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Mobile"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        error={!!mobileError}
                        helperText={mobileError}
                    />

                    <Button type="submit" fullWidth variant="contained" disabled={isUpdating} sx={{ mb: 2 }}>
                        {isUpdating ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "Update"
                        )}
                    </Button>
                </>
            )}
        </Box>
    );
};

export default MyProfileComponent;
