import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from './components/login/Login'
import { SnackbarComponent } from './components/utils/SnackbarComponent.jsx'
import SignupComponent from "./components/signup/Signup.jsx";
import NavbarComponent from "./components/home/Navbar.jsx";
import HomeComponent from "./components/home/Home.jsx";
import UrlDetails from "./components/home/UrlDetails.jsx";
import ProfileComponent from "./components/profile/Profile.jsx";

function App() {
    return (
        <>
            <Router>
                <NavbarComponent />
                <SnackbarComponent>
                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="/signin" element={<LoginComponent />} />
                        <Route path="/signup" element={<SignupComponent />} />
                        <Route path="/profile" element={<ProfileComponent />} />

                        <Route path="/url/:id" element={<UrlDetails />} />
                    </Routes>
                </SnackbarComponent >
            </Router>
        </>
    )
}

export default App
