import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import {useEffect, useState} from "react";
import FullTableHead from "./FullTableHead";
import LoadingProgressTable from "../../users/components/LoadingProgressTable";
import EmptyTable from "../../EmptyTable";
import FullTableBody from "./FullTableBody";
import {Typography} from "@mui/material";
import {filters, getFullUsersOnPage} from "../../../api/FullApi";

const FullTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible, setVisible] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [emptyRows, setEmptyRows] = useState(0)

    const [rowsAmount, setRowsAmount] = useState(0)
    const [rerender, setRerender] = useState(false);
    const [pageChanged, setPageChanged] = useState(false);

    const [filterElements, setFilterElements] = useState<filters>({
        idFilter: "",
        loginFilter: "",
        emailFilter: "",
        ipFilter: ""
    })
    const [prevFilterElements, setPrevFilterElements] = useState<filters>({
        idFilter: "",
        loginFilter: "",
        emailFilter: "",
        ipFilter: ""
    })

    const toggleRerender = () => {
        setRerender((prev) => !prev)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        if (pageChanged) {
            setPageChanged(false)
            return
        }

        getFullUsersOnPage(rowsPerPage, page, filterElements).then((returned) => {

            let values = returned.data.content.map(elem => ({
                ...elem,
                open: false,
                data: []
            }));

            let totalRows = returned.data.totalElements

            setVisible(values)
            setRowsAmount(totalRows)

            if (page * rowsPerPage >= totalRows && totalRows != 0) {
                let diff = ~~(totalRows / rowsPerPage);
                setPage(totalRows % rowsPerPage == 0 ? Math.max(0, diff - 1) : diff)
            } else {

                setIsLoading(false)

                if (totalRows == 0 && page != 0) {
                    setPage(0)
                    setPageChanged(true);
                    setIsLoading(false)
                }
            }

            setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - totalRows))

        }).catch(e => {
            console.log(e)

        }).finally(() => {

        })

    }, [page, rowsPerPage, rerender])

    const openRow = (index) => {
        const newRows = [...visible];
        newRows[index].open = !newRows[index].open;
        setVisible(newRows);
    }

    const handleFilter = (value: string, label: string) => {
        let trimValue = value.trim();

        if (label == "ID") {
            if (prevFilterElements.idFilter != trimValue) {

                setFilterElements(elem => {
                    return {
                        ...elem,
                        idFilter: trimValue
                    }
                })

                setPrevFilterElements(elem => {
                    return {
                        ...elem,
                        idFilter: trimValue
                    }
                })

            } else {
                return
            }

        } else if (label == "Логин") {
            if (prevFilterElements.loginFilter != trimValue){
                setPrevFilterElements(elem => {
                    return {
                        ...elem,
                        loginFilter: trimValue
                    }
                })

                setFilterElements(elem => {
                    return {
                        ...elem,
                        loginFilter: trimValue
                    }
                })
            } else {
                return;
            }

        } else if (label == "Почта") {
            if (prevFilterElements.emailFilter != trimValue){
                setPrevFilterElements(elem => {
                    return {
                        ...elem,
                        emailFilter: trimValue
                    }
                })

                setFilterElements(elem => {
                    return {
                        ...elem,
                        emailFilter: trimValue
                    }
                })
            } else {
                return;
            }
        }

        toggleRerender()
    }

    return (
        <>
            <>
                <Typography align="center" paddingBottom={"50px"} variant="h4" color={"orange"}>Таблица
                    пользователей</Typography>

                <Box sx={{width: '100%'}}>
                    <Paper sx={{width: '100%', mb: 2}}>
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                            >
                                <FullTableHead
                                    handleFilter={handleFilter}
                                />
                                {isLoading ? (
                                    <LoadingProgressTable rowsPerPage={rowsPerPage}/>
                                ) : visible.length == 0 ? (
                                    <EmptyTable/>
                                ) : (
                                    <FullTableBody
                                        visibleRows={visible}
                                        emptyRows={emptyRows}
                                        openRow={openRow}
                                    />
                                )}

                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={rowsAmount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            showFirstButton
                            showLastButton
                        />
                    </Paper>
                </Box>
            </>
        </>
    )
}

export default FullTable;