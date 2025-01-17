import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import FilterByRow from "../../segments/components/FilterByRow";

type alignCell = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export interface HeadCell {
    disablePadding: boolean;
    id: string | number;
    label: string;
    align: alignCell;
    name: string
}

export const headCells: HeadCell[] = [
    {
        id: 'id',
        align: "left",
        disablePadding: true,
        label: 'ID',
        name: 'id'
    },
    {
        id: 'login',
        align: "left",
        disablePadding: false,
        label: 'Логин',
        name: 'логина'
    },
    {
        id: 'email',
        align: "left",
        disablePadding: false,
        label: 'Почта',
        name: 'почты'
    },
    {
        id: 'ipAddress',
        align: "left",
        disablePadding: false,
        label: 'IP адресс',
        name: 'IP адресса'
    },
    {
        id: 'segmentName',
        align: "left",
        disablePadding: false,
        label: '',
        name: 'имени сегмента'
    },
];

const FullTableHead = ({handleFilter}) => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={'normal'}
                        style={index == 4 ? {width: '100px'} : {width: '400px'}}
                    >
                        <FilterByRow
                            handleChangeFilter={handleFilter}
                            label={headCell.label}
                            name={headCell.name}
                        />
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default FullTableHead
