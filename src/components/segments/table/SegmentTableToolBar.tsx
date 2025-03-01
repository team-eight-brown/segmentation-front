import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as React from "react";
import {useAuth} from "../../auth/AuthProvider";
import {DeleteForeverRounded, DeleteRounded} from "@mui/icons-material";

const SegmentTableToolBar = ({handleDeleteSegments, numSelected}) => {
    const ToolBarName = "Segments"
    const {userRoles} = useAuth()

    const handleFilter = () => {
        console.log("filter pressed");
    }

    return (
        <Toolbar
            sx={[
                {
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    <Tooltip title={userRoles.includes("Admin") ? "Delete" : "Delete not working"}>
                        {userRoles.includes("Admin") ? <IconButton
                            onClick={handleDeleteSegments}
                        >
                            <DeleteIcon/>
                        </IconButton> : <DeleteForeverRounded/>}
                    </Tooltip>
                </>
            ) : (
                <>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {ToolBarName}
                    </Typography>
                </>

            )}
        </Toolbar>
    );
}

export default SegmentTableToolBar