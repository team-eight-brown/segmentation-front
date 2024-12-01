import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import {useEffect, useMemo, useRef, useState} from "react"
import SegmentTableToolBar from "./SegmentTableToolBar";
import SegmentTableHead from "./SegmentTableHead";
import SegmentTableBody from "./SegmentTableBody";
import LoadingProgressTable from "../components/LoadingProgressTable";
import {
    addNewSegment,
    deleteSegments, filters,
    getSegmentsOnPage, getSegmentsOnPageWithFilter, ReturnData,
    START_LENGTH,
    updateSegmentData
} from "../../../api/SegmentApi";
import {notifyError, notifyLoading, updateError, updateSuccess} from "../../../toast/Notifies";
import {Id} from "react-toastify/dist/types";
import SegmentAdd from "../components/SegmentAdd";
import DisterbuteComponent from "../components/DisterbuteComponent";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

const createEmptyNumberSet = (): Set<Id> => {
    return new Set<Id>();
}

const createNumberSet = (set: Set<Id>) => {
    return new Set<Id>(set);
}

export default function SegmentTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible, setVisible] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState<Set<Id>>(createEmptyNumberSet());
    const [selectedAll, setSelectedAll] = useState(false)
    const [emptyRows, setEmptyRows] = useState(0)
    const [segmentAddValue, setSegmentAddValue] = useState("");
    const [isProcessAdd, setIsProcessAdd] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(0)
    const [filterElements, setFilterElements] = useState<filters>({nameFilter: "", idFilter: ""})
    const [rerender, setRerender] = useState(false);

    const toggleRerender = () => {
        setRerender((prev) => !prev)
    }

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value.trim())
    }

    /*    const clearSelections = () => {
            setSelectedAll(false)
            setSelected(createEmptyNumberSet())
            setPageChanged(false)
        }

        */

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const setSelAll = () => {
        setSelectedAll(true)
        setSelected(createEmptyNumberSet())
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => { //todo FIX
        const pageSelections = visible.map((n) => n.id);

        let isAllOnPageSelected = true;
        let toAdd : Id[] = []

        pageSelections.forEach(e => {
            if (!selected.has(e)) {
                isAllOnPageSelected = false;
                toAdd.push(e);
            }
        })

        if (selectedAll || rowsAmount == selected.size){
            if (selected.size == 0){
                setSelectedAll(false)
            }
            setSelected(createEmptyNumberSet())
        } else {
            if (isAllOnPageSelected) {
                setSelAll()
                return
            }

            setSelected(prev => {
                toAdd.forEach(e => {
                    prev.add(e)
                })
                return createNumberSet(prev);
            })
        }

        /*const newSelected = visible.map((n) => n.id);

        if (selectedAll) {
            if (selected.length == 0){
                setSelectedAll(false)
            }
            setSelected([])
        } else {
            if (selected.length != 0 && selected.length % rowsPerPage == 0 || selected.length == rowsAmount){
                if (pageChanged){
                    setSelected(sels => sels.concat(newSelected))
                    setPageChanged(false)
                } else {
                    setSelAll()
                }
                return
            }
            if (selected.length > rowsPerPage){
                setSelected(sels => sels.concat(newSelected))
            } else {
                if (newSelected.length == rowsAmount) {
                    setSelAll()
                } else {
                    setSelected(newSelected)
                }

            }

        }*/

    };

    //todo add filters!

    const handleSelect = (event: React.MouseEvent<unknown>, id: number) => { //todo fix bug when selected <= rowsAmount and page == 1 + check selectedAll
        if (selected.has(id)) {
            setSelected(prev => {
                prev.delete(id);
                return createNumberSet(prev);
            })
        } else {
            setSelected(prev => {
                prev.add(id);
                return createNumberSet(prev);
            })
        }
    };

    const handleFilter = (value: string, label: string) => { //todo fix with filters pagination! + fix chekced all
        if (label == "ID") {
            setFilterElements(elem => {
                return {
                    ...elem,
                    idFilter: value
                }
            })
        } else if (label == "NAME") {
            setFilterElements(elem => {
                return {
                    ...elem,
                    nameFilter: value
                }
            })
        }

        toggleRerender()
    }

    const handleChangeById = (id, newValue) => {
        setIsLoading(true)

        let tmpId = notifyLoading("Обновление значения элемента")

        updateSegmentData(id, newValue).then(() => {
            updateSuccess(tmpId, "Значение элемента обновлено");

            toggleRerender()
        })

    }

    const handleDeleteSegments = () => {  //todo FIX bug если я оставлю единственный элемент на странице!!!
        setIsLoading(true)
        let tmpId = notifyLoading("Элементы удаляются")

        deleteSegments(selectedAll, selected).then(({deleted, rows}) => {
            updateSuccess(tmpId, "Выбранные элементы удалены")

            setSelected(createEmptyNumberSet());
            setSelectedAll(false);

            toggleRerender();
        })

    }

    const handleAddSegment = () => {
        if (segmentAddValue === "") {
            notifyError("Пустое поле")
            return
        }

        setIsProcessAdd(true);
        setIsLoading(true)

        const id = notifyLoading("Добавление элемента");

        addNewSegment(segmentAddValue).then((e: number) => {
            updateSuccess(id, "Элемент добавлен")
            if (selectedAll){
                setSelected(prev=>{
                    prev.add(e)
                    return prev;
                })
            }
        }).finally(() => {
            toggleRerender()

            setIsProcessAdd(false);
        })
    }

    useEffect(() => {
        setIsLoading(true)

        getSegmentsOnPageWithFilter(rowsPerPage, page, filterElements).then((r: ReturnData) => {
            setVisible(r.data)
            setRowsAmount(r.rows)

            if (page * rowsPerPage >= r.rows && r.rows != 0) {
                let diff = ~~(r.rows / rowsPerPage);
                setPage(r.rows % rowsPerPage == 0 ? Math.max(0, diff - 1) : diff)
            } else {
                setIsLoading(false)
            }

            setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - r.rows))

        }).catch(e => {
            notifyError("Ошибка получения данных с сервера")
        }).finally(() => {

        })

    }, [page, rowsPerPage, rerender])

    return (
        <>
            <SegmentAdd
                handleSegmentAddValue={handleSegmentAddValue}
                segmentAddValue={segmentAddValue}
                handleAddSegment={handleAddSegment}
                isProcessAdd={isProcessAdd}

            />
            <DisterbuteComponent
            />
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <SegmentTableToolBar
                        numSelected={selectedAll ? rowsAmount - selected.size : selected.size}
                        handleDeleteSegments={handleDeleteSegments}
                    />
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <SegmentTableHead
                                numSelected={selectedAll ? rowsAmount - selected.size : selected.size}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rowsAmount}
                                handleFilter={handleFilter}
                                isAllSelected={selectedAll}
                            />
                            {isLoading ? (
                                <LoadingProgressTable rowsPerPage={rowsPerPage}/>
                            ) : visible.length == 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Nothing to see
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <SegmentTableBody
                                    allSelected={selectedAll}
                                    visibleRows={visible}
                                    selected={selected}
                                    handleClick={handleSelect}
                                    emptyRows={emptyRows}
                                    handleChangeById={handleChangeById}
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