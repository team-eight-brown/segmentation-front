import {Container} from "@mui/material";
import SegmentTable from "./table/SegmentTable";
import BackButton from "../dashboard/BackButton";
import LogoutButton from "../auth/LogoutButton";
import UserIcon from "../userdata/UserIcon";

const SegmentPage = () => {
    return (
        <>
            <Container component="main">
                <BackButton/>
                <SegmentTable/>
                <LogoutButton/>
                <UserIcon/>
            </Container>
        </>
    );
};

export default SegmentPage;