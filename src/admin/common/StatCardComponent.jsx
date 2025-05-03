import { Card, CardContent, Typography, Box } from "@mui/material";
import { People, Link, PersonAdd, Today, Language, Group, InsertLink } from "@mui/icons-material";

const iconMap = {
    "Total Users": <People fontSize="large" color="primary" />,
    "Total URLs Shortened": <Link fontSize="large" color="secondary" />,
    "Today's New Users": <PersonAdd fontSize="large" color="success" />,
    "Today's Shortened URLs": <Today fontSize="large" color="warning" />,
    "Total Custom Domains": <Language fontSize="large" color="info" />,
    "Users With Custom Domains": <Group fontSize="large" color="primary" />,
    "Custom Domain Short URLs": <InsertLink fontSize="large" color="secondary" />,
};

export const StatCardComponent = ({ title, value }) => (
    <Card variant="outlined" sx={{ minWidth: 200, m: 1, borderLeft: '5px solid #1976d2', backgroundColor: '#f0f8ff' }}>
        <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
                <Box>{iconMap[title] || <People fontSize="large" />}</Box>
                <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);
