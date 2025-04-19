import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from './components/login/Login'
import { SnackbarComponent } from './components/utils/SnackbarComponent.jsx'
import SignupComponent from "./components/signup/Signup.jsx";

function App() {
    return (
        <>
            <SnackbarComponent>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/signin" element={<LoginComponent />} />
                        <Route path="/signup" element={<SignupComponent />} />
                    </Routes>
                </Router>
            </SnackbarComponent>
        </> 
    )
}

export default App
