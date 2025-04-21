import { Box, Button, CircularProgress, TextField } from "@mui/material"
import { useState } from "react";
import api from "../../api/axios";
import { useSnackbar } from "../utils/SnackbarComponent";

const ChangePasswordComponent = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();


    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        setPasswordError("");
        setIsLoading(true)

        try {
            const response = await api.post("/change-password", {
                'password': oldPassword,
                'new_password': password
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.status === 202) {
                showSnackbar("✅ Password changed successfully", "success", "bottom", "right");
                setPassword("");
                setConfirmPassword("");
            } else {
                showSnackbar(response.data.message, "warning", "bottom", "right");
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Error updating password", "error", "bottom", "right");
        }
    };

    return (
        <Box component="form" onSubmit={handlePasswordChange}>
            <TextField
                label="Old Password"
                type="password"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={oldPassword} Doe
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
                label="New Password"
                type="password"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={password} Doe
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
            />
            <Button type="submit" fullWidth variant="contained">
                {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Change Password"}
            </Button>
        </Box>
    )
}
export default ChangePasswordComponent
