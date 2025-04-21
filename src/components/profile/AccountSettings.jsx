import {
    Avatar,
    Container,
    Paper,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { useState } from "react";
import MyProfileComponent from "./MyProfile";
import ChangePasswordComponent from "./ChangePassword";

const AccountSettingComponent = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

   

    return (
        <Container maxWidth="sm">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 3 }}>
                <Avatar sx={{ mx: "auto", bgcolor: 'secondary.main', mb: 1 }} />
                <Typography variant="h5" align="center" gutterBottom>
                    Account Settings
                </Typography>

                <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 2 }}>
                    <Tab label="My Profile" />
                    <Tab label="Change Password" />
                </Tabs>

                {tabValue === 0 && (
                   <MyProfileComponent />
                )}

                {tabValue === 1 && (
                    <ChangePasswordComponent />
                )}
            </Paper>
        </Container>
    );
};

export default AccountSettingComponent;
