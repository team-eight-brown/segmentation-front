import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import {useEffect, useState} from "react"
import UsersTableHead from "./UsersTableHead";
import UsersTableBody from "./UsersTableBody";
import {notifyError, notifyLoading, notifySuccess, updateError, updateSuccess} from "../../../toast/Notifies";
import EmptyTable from "../../EmptyTable";
import {addNewSegmentToUser, deleteSegment, getSegmentsOnUserPage} from "../../../api/UserApi";
import LoadingProgressTable from "../../users/components/LoadingProgressTable";
import SegmentAdd from "./SegmentAdd";

export default function UsersTable({userId}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible, setVisible] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [emptyRows, setEmptyRows] = useState(0)
    const [segmentAddValue, setSegmentAddValue] = useState("");

    const [isProcessAdd, setIsProcessAdd] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(0)
    const [rerender, setRerender] = useState(false);
    const [pageChanged, setPageChanged] = useState(false);

    const toggleRerender = () => {
        setRerender((prev) => !prev)
    }

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value.trim())
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddSegment = () => {
        if (segmentAddValue === "") {
            notifyError("Пустое поле")
            return
        }

        setIsProcessAdd(true);
        setIsLoading(true)

        const id = notifyLoading("Добавление элемента");

        addNewSegmentToUser(userId, segmentAddValue).then((e) => {
            updateSuccess(id, "Элемент добавлен")
        }).catch((error) => {
            updateError(id, "Ошибка добавления элемента: \n" + error.response.data.error)
        }).finally(() => {
            toggleRerender()
            setIsProcessAdd(false);
        })
    }

    useEffect(() => {
        if (pageChanged) {
            setPageChanged(false)
            return
        }

        getSegmentsOnUserPage(userId, rowsPerPage, page).then((returned) => {

            let values = returned.data.content;
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
        })

    }, [page, rowsPerPage, rerender])

    const handleDeleteSegmentFromUser = (id) => {
        deleteSegment(userId, id).then((e) => {
            notifySuccess("Сегмент удален")
        }).catch((error) => {
            notifyError("Ошибка удаления сегмента: \n" + error.response.data.error)
        }).finally(() => {
            toggleRerender()
        })
    }

    return (
        <>
            <SegmentAdd
                handleSegmentAddValue={handleSegmentAddValue}
                segmentAddValue={segmentAddValue}
                handleAddSegment={handleAddSegment}
                isProcessAdd={isProcessAdd}
                userId={userId}
            />
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <UsersTableHead
                            />
                            {isLoading ? (
                                <LoadingProgressTable rowsPerPage={rowsPerPage}/>
                            ) : visible.length == 0 ? (
                                <EmptyTable/>
                            ) : (
                                <UsersTableBody
                                    visibleRows={visible}
                                    emptyRows={emptyRows}
                                    handleDeleteSegmentFromUser={handleDeleteSegmentFromUser}
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

    );
}