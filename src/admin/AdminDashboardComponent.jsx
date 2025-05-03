import { Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { StatCardComponent } from "./common/StatCardComponent";
import { Delete, Edit } from "@mui/icons-material";
import { UserTableComponent } from "./UserTableComponent";

export const AdminDashboardComponent = () => {
    // Dummy data
    const stats = [
        { title: 'Total Users', value: 1234 },
        { title: 'Total URLs Shortened', value: 5432 },
        { title: "Today's New Users", value: 12 },
        { title: "Today's Shortened URLs", value: 34 },
        { title: 'Total Custom Domains', value: 56 },
        { title: 'Users With Custom Domains', value: 23 },
        { title: 'Custom Domain Short URLs', value: 140 },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>

            <Grid container spacing={2}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <StatCardComponent title={stat.title} value={stat.value} />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" style={{ marginTop: 40, marginBottom: 10 }}>
                Users
            </Typography>
            <UserTableComponent />
        </div>
    );
};
