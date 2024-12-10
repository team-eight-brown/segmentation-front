import {Container, ThemeProvider} from "@mui/material";
import theme from "../../theme/Theme";
import SegmentTable from "./table/SegmentTable";
import BackButton from "../dashboard/BackButton";
import LogoutButton from "../auth/LogoutButton";

const SegmentPage = () => {
    return (
        <>
            <Container component="main">
                <BackButton/>
                <SegmentTable/>
                <LogoutButton/>
            </Container>
        </>
    );
};

export default SegmentPage;