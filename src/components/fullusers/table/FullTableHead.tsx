import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import FilterByRow from "../../segments/components/FilterByRow";

type alignCell = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface HeadCell {
    disablePadding: boolean;
    id: string | number;
    label: string;
    align: alignCell;
}

const headCells: HeadCell[] = [
    {
        id: 'id',
        align: "left",
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'login',
        align: "left",
        disablePadding: false,
        label: 'Логин',
    },
    {
        id: 'email',
        align: "left",
        disablePadding: false,
        label: 'Почта',
    },
    {
        id: 'ipAddress',
        align: "left",
        disablePadding: false,
        label: 'IP адресс',
    },
];

const FullTableHead = ({handleFilter}) => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={'normal'}
                        style={{width: '400px'}}

                    >
                        <FilterByRow
                            handleChangeFilter={handleFilter}
                            label={headCell.label}
                        />
                    </TableCell>

                ))}
                <TableCell
                    padding={'normal'}
                    style={{width: '50px'}}

                >

                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default FullTableHead
