import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import EditableElement from "../components/editable/EditableElement";

const SegmentTableBody = ({visibleRows, selected, handleClick, emptyRows, handleChangeName, handleChangeDescription, userRoles}) => {
    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                const isItemSelected = selected.has(row.id)
                const labelId = `segment-table-checkbox-${index}`;

                return (
                    <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                    >
                        <TableCell
                            padding="checkbox"
                            sx={{cursor: 'pointer'}}
                            onClick={(event) => handleClick(event, row.id)}
                        >
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                        >
                            {row.id}
                        </TableCell>

                        <TableCell
                            align="left"
                        >
                            {userRoles.includes("Admin") ? <EditableElement id={row.id} value={row.name} handleChangeById={handleChangeName}/>: <div> {row.name} </div>}
                        </TableCell>

                        <TableCell
                            align="left"
                        >
                            {userRoles.includes("Admin") ? <EditableElement id={row.id} value={row.description} handleChangeById={handleChangeDescription}/> : <div> {row.description} </div>}

                        </TableCell>
                    </TableRow>
                );
            })}

            {emptyRows > 0 && (
                <TableRow
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

export default SegmentTableBody