import BackButton from "../dashboard/BackButton";
import LogoutButton from "../auth/LogoutButton";
import {Container} from "@mui/material";
import UsersTable from "./table/UsersTable";
import UserIcon from "../userdata/UserIcon";

const UserPage = () => {

    return (
        <>
            <Container component="main">
                <BackButton/>
                <UsersTable/>
                <LogoutButton/>
                <UserIcon/>
            </Container>
        </>
    );
};

export default UserPage;