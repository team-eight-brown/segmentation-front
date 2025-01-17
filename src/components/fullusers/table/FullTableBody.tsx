import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {Collapse} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import UsersTable from "../usertable/UsersTable";

const FullTableBody = ({visibleRows, emptyRows, openRow}) => {
    return (
        <TableBody>
            {visibleRows.map((row, index) => (
                    <React.Fragment key={row.id}>
                        <TableRow
                            key={row.id}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                padding={'normal'}
                            >
                                {row.id}
                            </TableCell>

                            <TableCell
                                align="left"
                            >
                                {row.login}
                            </TableCell>
                            <TableCell
                                align="left"
                            >
                                {row.email}
                            </TableCell>
                            <TableCell
                                align="left"
                            >
                                {row.ipAddress}
                            </TableCell>

                            <TableCell
                                padding={'normal'}
                                style={{width: '50px'}}
                            >
                                <IconButton aria-label="delete" size="large" onClick={() => openRow(index)}>
                                    {row.open ? <KeyboardArrowUp style={{cursor: 'pointer'}}/> :
                                        <KeyboardArrowDown style={{cursor: 'pointer'}}/>}
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key={"i" + row.id}
                        >
                            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                                <Collapse in={row.open} timeout="auto" unmountOnExit>
                                    <UsersTable userId={row.id}></UsersTable>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                )
            )}

            {emptyRows > 0 && (
                <TableRow
                    key={emptyRows}
                    style={{
                        height: (53) * emptyRows,
                    }}
                >
                    <TableCell colSpan={6}/>
                </TableRow>
            )}
        </TableBody>
    )
}

export default FullTableBody