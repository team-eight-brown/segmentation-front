import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {useAuth} from "../auth/AuthProvider";

const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleClickLogin = () => {
        navigate("/login")
    }

    const handleClickRegister = () => {
        navigate("/register")
    }

    useEffect(() => {
        if (user && window.location.pathname == "/"){
            navigate("/dashboard")
        }
    }, []);

    return (
        <>
            <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 3,
                    p: 3,
                }}
            >
                <Typography component="h1" variant="h5" color="secondary">
                    WelcomePage
                </Typography>
                <Stack spacing={4} direction="column" maxWidth={300}>
                    <Button variant="outlined" onClick={handleClickLogin}>Логин</Button>
                    <Button variant="outlined" onClick={handleClickRegister}>Регистрация</Button>
                </Stack>
            </Box>
            </Container>
        </>
    )
}

export default HomePage;