import {Popover, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {DeleteForeverRounded, FilterAlt, FilterAltOff} from "@mui/icons-material";
import * as React from "react";
import {useState} from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tooltip from "@mui/material/Tooltip";

const FilterByRow = ({label, handleChangeFilter, name}) => {
    const [filterValue, setFilterValue] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setFilterValue(elem=> elem.trim())
        handleChangeFilter(filterValue, name)
    };

    const handleClear = () => {
        setFilterValue('')
        setAnchorEl(null);
        handleChangeFilter('', name)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            {label}
            <Tooltip title="filter">
                <IconButton onClick={handleFilterClick}>
                    {filterValue != "" ? <FilterAltOff /> : <FilterAlt />}
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '16px', width: '400px' }}>
                    <TextField
                        label={"Фильтр для " + name}
                        variant="outlined"
                        fullWidth
                        autoFocus={true}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    size={"small"}
                                    color="secondary"
                                    onClick={() => {handleClear()}}
                                >
                                    <DeleteForeverRounded/>
                                </IconButton>
                            ),
                        }}
                    />
                </div>
            </Popover>
        </>

    )
}

export default FilterByRow