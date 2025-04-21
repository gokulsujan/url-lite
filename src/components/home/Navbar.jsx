import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    ListItemIcon,
    Divider,
    Link
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState(localStorage.getItem("access_token"));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setAuth(null);
        handleClose();
        navigate("/signin");
    };

    const hanldeHome = () => {
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        onClick={hanldeHome}
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        URL lite
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                sx={{ mt: 1.5 }}
                            >
                                <MenuItem onClick={handleProfile}>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavbarComponent;
