import {useAuth} from "../../auth/AuthProvider";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {deleteAdmin, setAdmin} from "../../../api/UserApi";
import UserIcon from "../UserIcon";
import BackButton from "../../dashboard/BackButton";
import LogoutButton from "../../auth/LogoutButton";
import {notifyError, notifySuccess} from "../../../toast/Notifies";
import {rolesUser} from "../../../api/AuthApi";

const UserRoles = () => {
    const {userRoles, userData, setUserData, setUserRoles} = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
        if (!userRoles.includes("Admin")) {
            navigate("/dashboard")
        }
    }, [userRoles, ]);

    const [grantId, setGrantId] = useState('');
    const [revokeId, setRevokeId] = useState('');

    const handleChangeGrant = (event) => {
        const inputValue = event.target.value;

        const isPositiveInteger = /^[0-9]+$/.test(inputValue);

        if (inputValue === '' || !isPositiveInteger) {
            setGrantId("");
        } else {
            setGrantId(inputValue)
        }
    }

    const handleChangeRevoke = (event) => {
        const inputValue = event.target.value;

        const isPositiveInteger = /^[0-9]+$/.test(inputValue);

        if (!isPositiveInteger) {
            setRevokeId("");
        } else {
            setRevokeId(inputValue)
        }
    }


    const handleGrantSubmit = (event) => {
        event.preventDefault();
        setAdmin(grantId).then((resp)=>{
            notifySuccess(resp.data.value)
        }).catch((data) => {
            if (data.response.status == 403){
                notifyError(data.response.data.value);
            } else {
                notifyError(data.response.data.error);
            }
        })

        setGrantId('');
    };

    const handleRevokeSubmit = (event) => {
        event.preventDefault();
        deleteAdmin(revokeId).then((resp)=>{
            notifySuccess(resp.data.value)

            if (revokeId == userData["id"]){
                rolesUser().then((data)=>{
                    setUserData(data.data)
                    setUserRoles(data.data.roles)
                })
            }

        }).catch((data) => {
            if (data.response.status == 403){
                notifyError(data.response.data.value);
            } else {
                notifyError(data.response.data.error);
            }
        })

        setRevokeId('');
    };

    return (
        <Container>
            <Box sx={{ my: 3}}>
                <Typography variant="h4" align={"center"} color={"primary"}>
                    Управление правами администратора
                </Typography>

                <Stack component="form" onSubmit={handleGrantSubmit} sx={{pt: 2, mb: 3, pb: 10, width: 300}}>
                    <Typography variant="h6">Выдать права админа</Typography>
                    <TextField
                        label="ID"
                        variant="outlined"
                        type={"number"}
                        inputProps={{
                            min: 0,  // Можно использовать, но это скорее для визуального ограничения
                            step: 1, // Убедиться, что не вводятся дроби через стрелки
                        }}
                        value={grantId}
                        onChange={(e) => handleChangeGrant(e)}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Выдать права
                    </Button>
                </Stack>

                <Stack component="form" onSubmit={handleRevokeSubmit} sx={{ mb: 3, pb: 10, width: 300}}>
                    <Typography variant="h6">Забрать права админа</Typography>
                    <TextField
                        label="ID"
                        variant="outlined"
                        value={revokeId}
                        onChange={(e) => handleChangeRevoke(e)}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="secondary">
                        Забрать права
                    </Button>
                </Stack>
            </Box>
            <BackButton/>
            <LogoutButton/>
            <UserIcon/>
        </Container>
    );
}

export default UserRoles