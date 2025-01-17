import BackButton from "../dashboard/BackButton";
import LogoutButton from "../auth/LogoutButton";
import {Container} from "@mui/material";
import FullTable from "./table/FullTable";
import UserIcon from "../userdata/UserIcon";

const FullTablePage = () => {
    return (
        <>
            <Container component="main">
                <BackButton/>
                <FullTable/>
                <LogoutButton/>
                <UserIcon/>
            </Container>
        </>
    )
}

export default FullTablePage