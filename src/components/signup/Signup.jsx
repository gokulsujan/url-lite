import { AddCircle } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Paper, TextField, Typography, Grid, Link as MaterialLink} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const SignupComponent = () => {
    return (
        <Container maxWidth="sm" >
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: "auto",
                    bgcolor: 'secondary.main',
                    textAlign: "center",
                    mb: 1
                }}>
                    <AddCircle />
                </Avatar>
                <Typography component='h1' variant="h5" sx={{ textAlign: 'center' }}>
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField placeholder="Enter your full name" fullWidth required autoFocus sx={{ mb: 2 }} type='text' />
                    <TextField placeholder="Enter your email id" fullWidth required autoFocus sx={{ mb: 2 }} type='email' />
                    <TextField placeholder="Enter your mobile number" fullWidth required autoFocus sx={{ mb: 2 }} type='tel' />
                    <TextField placeholder="Enter your password" fullWidth required autoFocus sx={{ mb: 2 }} type='password' />
                    <TextField placeholder="Confirm your password" fullWidth required autoFocus sx={{ mb: 2 }} type='password' />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                        Sign up
                    </Button>
                    <Button type="reset" variant="contained" color="inherit" fullWidth sx={{ mt: 1 }}>
                        Reset
                    </Button>
                    <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
                    <Grid item>
                        <MaterialLink component={RouterLink} to="/forget-password">Forget Password</MaterialLink>
                    </Grid>
                    <Grid item>
                        <MaterialLink component={RouterLink} to="/signin">Sign in</MaterialLink>
                    </Grid>
                </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default SignupComponent
