import { Delete, Edit, Link } from "@mui/icons-material";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useSnackbar } from "../components/utils/SnackbarComponent";

export const UserTableComponent = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const showSnackbar = useSnackbar();


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            let response = await api.get("/api/v1/user/", {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 200) {
                setUsers(response.data.result.users);
            } else {
                showSnackbar(response?.data.message || "Something went wrong", "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        }

    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box mt={4}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <TextField
                    size="small"
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Box>
            <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>SL No</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>Name</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>Email ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>Verified Email ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>Mobile Number</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.verified_email}</TableCell>
                                <TableCell>{user.mobile}</TableCell>
                                <TableCell>
                                    <IconButton size="small" color="primary">
                                        <Link fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
