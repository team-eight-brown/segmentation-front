import BackButton from "../dashboard/BackButton";
import LogoutButton from "../auth/LogoutButton";
import {Container} from "@mui/material";
import FullTable from "./table/FullTable";

const FullTablePage = () => {
    return (
        <>
            <Container component="main">
                <BackButton/>
                <FullTable/>
                <LogoutButton/>
            </Container>
        </>
    )
}

export default FullTablePage