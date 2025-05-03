import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from './components/login/Login'
import { SnackbarComponent } from './components/utils/SnackbarComponent.jsx'
import SignupComponent from "./components/signup/Signup.jsx";
import NavbarComponent from "./components/home/Navbar.jsx";
import HomeComponent from "./components/home/Home.jsx";
import UrlDetails from "./components/home/UrlDetails.jsx";
import AccountSettingComponent from "./components/profile/AccountSettings.jsx";
import SendEmailVerificationOtpComponent from "./components/email_verification/SendEmailVerificationOtp.jsx";
import VerifyEmailOtpComponent from "./components/email_verification/VerifyOTP.jsx";
import ForgetPasswordComponent from "./components/forget_password/ForgetPassword.jsx";
import { Box } from "@mui/material";
import { AdminDashboardComponent } from "./admin/AdminDashboardComponent.jsx";

function App() {
    return (
        <>
            <Router>
                <NavbarComponent />
                <SnackbarComponent>
                    <Box sx={{ mt: 12 }}>
                        <Routes>
                            <Route path="/" element={<HomeComponent />} />
                            <Route path="/signin" element={<LoginComponent />} />
                            <Route path="/signup" element={<SignupComponent />} />
                            <Route path="/forget-password" element={<ForgetPasswordComponent />} />
                            <Route path="/send-email-otp" element={<SendEmailVerificationOtpComponent />} />
                            <Route path="/verify-email" element={<VerifyEmailOtpComponent />} />
                            <Route path="/profile" element={<AccountSettingComponent />} />

                            <Route path="/url/:id" element={<UrlDetails />} />

                            <Route path="/admin" element={<AdminDashboardComponent />} />
                        </Routes>
                    </Box>
                </SnackbarComponent >
            </Router>
        </>
    )
}

export default App
