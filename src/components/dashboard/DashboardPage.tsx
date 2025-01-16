import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import LogoutButton from "../auth/LogoutButton";
import UserIcon from "../userdata/UserIcon";
import {useAuth} from "../auth/AuthProvider";

const DashboardPage = () => {
    const navigate = useNavigate();
    const {userRoles} = useAuth()

    const handleClickSegments = () => {
        navigate("/segments")
    }

    const handleClickUsers = () => {
        navigate("/users")
    }

    const handleClickFullTable = () => {
        navigate("/fulltable")
    }

    const handleClickUserRoles = () => {
        navigate("/roles")
    }

    return (
        <>
            <LogoutButton/>
            <Container component="main">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 5,
                        p: 2,
                        m: 1,
                    }}
                >
                    <Typography component="h1" variant="h4" color="primary">
                        Dashboard
                    </Typography>
                    <Stack spacing={2} direction="column" maxWidth={500}>
                        <Button variant="outlined" onClick={handleClickSegments}>На сегменты</Button>
                        <Button variant="outlined" onClick={handleClickUsers}>На пользователей</Button>
                        <Button variant="outlined" onClick={handleClickFullTable}>На всех пользователей</Button>
                        {userRoles.includes("Admin") && <Button variant="outlined" onClick={handleClickUserRoles}>На редактирование прав</Button>}
                    </Stack>
                </Box>
                <UserIcon/>
            </Container>
        </>
    )
}

export default DashboardPage;