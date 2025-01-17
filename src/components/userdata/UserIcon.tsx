import './UserIcon.css';
import {Box, Button, Fade, Slide, Stack, styled, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useAuth} from "../auth/AuthProvider";

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 600,
        fontSize: theme.typography.pxToRem(25),
        border: '3px solid orange',
    },
}));

const UserIcon = () => {
    const {userData} = useAuth()

    return (
        <HtmlTooltip
            title={
                <Fade in={true} timeout={600}>
                    <Stack
                        spacing={2}
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <Slide direction="down" in={true} timeout={300}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                Информация о пользователе
                            </Typography>
                        </Slide>
                        <Slide direction="down" in={true} timeout={300}>
                            <div><b>ID</b>: {userData["id"]}</div>
                        </Slide>
                        <Slide direction="down" in={true} timeout={300}>
                            <div><b>Логин</b>: {userData["login"]}</div>
                        </Slide>
                        <Slide direction="down" in={true} timeout={300}>
                            <div><b>Почта</b>: {userData["email"]}</div>
                        </Slide>
                        <Slide direction="down" in={true} timeout={300}>
                            <div><b>Рол{userData["roles"].length > 1 ? 'и' : 'ь'}</b>: {userData["roles"].join(", ")}</div>
                        </Slide>
                    </Stack>
                </Fade>

            }
        >
            <img src={"user-profile.svg"} className={"user-img"}/>

        </HtmlTooltip>
    )
        ;
};
export default UserIcon