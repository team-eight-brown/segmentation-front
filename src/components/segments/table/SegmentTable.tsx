import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import {useEffect, useState} from "react"
import SegmentTableToolBar from "./SegmentTableToolBar";
import SegmentTableHead, {headCells} from "./SegmentTableHead";
import SegmentTableBody from "./SegmentTableBody";
import LoadingProgressTable from "../components/LoadingProgressTable";
import {
    addNewSegment,
    deleteSegments, distribute, distributeRandom, filters,
    getSegmentsOnPageWithFilter,
    updateSegmentData
} from "../../../api/SegmentApi";
import {notifyError, notifyLoading, notifySuccess, updateError, updateSuccess} from "../../../toast/Notifies";
import {Id} from "react-toastify/dist/types";
import SegmentAdd from "../components/SegmentAdd";
import DistributeSegment from "../components/DistributeSegment";
import {useAuth} from "../../auth/AuthProvider";
import EmptyTable from "../../EmptyTable";

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
    const [isLoading, setIsLoading] = useState(true)
    const [selected, setSelected] = useState<Set<Id>>(createEmptyNumberSet());
    const [emptyRows, setEmptyRows] = useState(0)
    const [segmentAddValue, setSegmentAddValue] = useState("");
    const [segmentDescription, setSegmentDescription] = useState("");

    const [isProcessAdd, setIsProcessAdd] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(0)
    const [filterElements, setFilterElements] = useState<filters>({nameFilter: "", idFilter: "", descriptionFilter: ""})
    const [prevFilterElements, setPrevFilterElements] = useState<filters>({
        nameFilter: "",
        idFilter: "",
        descriptionFilter: ""
    })
    const [rerender, setRerender] = useState(false);
    const [isFilterSet, setIsFilterSet] = useState(false);
    const [pageChanged, setPageChanged] = useState(false);
    const {logout} = useAuth();
    const {userRoles} = useAuth()

    const checkFilterSet = (): boolean => {
        return filterElements.idFilter != "" || filterElements.nameFilter != "" || filterElements.descriptionFilter != "";
    }

    const toggleRerender = () => {
        setRerender((prev) => !prev)
    }

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value.trim())
    }

    const handleSegmentDescription = (e) => {
        setSegmentDescription(e.target.value.trim())
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const addToSelected = (toAdd) => {
        setSelected(prev => {
            toAdd.forEach(e => {
                prev.add(e)
            })
            return createNumberSet(prev);
        })
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageSelections = visible.map((n) => n.id);

        let isAllOnPageSelected = true;
        let toAdd: Id[] = []

        pageSelections.forEach(e => {
            if (!selected.has(e)) {
                isAllOnPageSelected = false;
                toAdd.push(e);
            }
        })

        if (isAllOnPageSelected) {
            setSelected(createEmptyNumberSet())
        }
        addToSelected(toAdd);
    };

    //todo add filters!

    const handleSelect = (event: React.MouseEvent<unknown>, id: number) => {
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

    const handleFilter = (value: string, label: string) => {
        let trimValue = value.trim();

        if (label == headCells[0].name) {
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

        } else if (label == headCells[1].name) {
            if (prevFilterElements.nameFilter != trimValue) {
                setPrevFilterElements(elem => {
                    return {
                        ...elem,
                        nameFilter: trimValue
                    }
                })

                setFilterElements(elem => {
                    return {
                        ...elem,
                        nameFilter: trimValue
                    }
                })
            } else {
                return;
            }

        } else if (label == headCells[2].name) {
            if (prevFilterElements.descriptionFilter != trimValue) {
                setPrevFilterElements(elem => {
                    return {
                        ...elem,
                        descriptionFilter: trimValue
                    }
                })

                setFilterElements(elem => {
                    return {
                        ...elem,
                        descriptionFilter: trimValue
                    }
                })
            } else {
                return;
            }

        }

        toggleRerender()
    }

    const handleChangeName = (id, newValue) => {
        setIsLoading(true)

        let tmpId = notifyLoading("Обновление значения элемента")
        let found = visible.find((elem) => elem.id == id)

        updateSegmentData(id, {...found, name: newValue}).then(() => {
            updateSuccess(tmpId, "Значение элемента обновлено");

        }).catch((error) => {
            updateError(tmpId, "Значение элемента не удалось обноввить");

        }).finally(() => {
            toggleRerender()
        })
    }

    const handleChangeDescription = (id, newValue) => {
        setIsLoading(true)

        let tmpId = notifyLoading("Обновление значения элемента")

        let found = visible.find((elem) => elem.id == id)

        updateSegmentData(id, {...found, description: newValue}).then(() => {
            updateSuccess(tmpId, "Значение элемента обновлено");

        }).catch((error) => {
            updateError(tmpId, "Значение элемента не удалось обноввить");

        }).finally(() => {
            toggleRerender()
        })
    }

    const handleDeleteSegments = () => {  //todo FIX bug если я оставлю единственный элемент на странице!!!
        selected.forEach((sel) => {
            setIsLoading(true)
            let tmpId = notifyLoading("Элементы удаляются")

            deleteSegments(sel).then(() => {
                updateSuccess(tmpId, "Выбранные элементы удалены")

                setSelected(createEmptyNumberSet());
                toggleRerender();
            })
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

        addNewSegment(segmentAddValue, segmentDescription).then((e) => {
            updateSuccess(id, "Элемент добавлен")
        }).catch((error) => {
            updateError(id, "Ошибка добавления элемента: \n" + error.response.data.error)
        }).finally(() => {
            toggleRerender()
            setIsProcessAdd(false);
        })
    }

    useEffect(() => {
        setIsFilterSet(checkFilterSet())
    }, [filterElements]);

    function handleSubmitRegexSegments(data) {
        distribute(data).then((response) => {
            notifySuccess("Распределено успешно!")
        }).catch((error) => {
            console.log(error)
            notifyError("Ошибка распределения")
        }).finally(() => {
            toggleRerender()
        })
    }

    const handleSubmitPercentageSegments = (data) => {
        distributeRandom(data).then((response) => {
            notifySuccess(response.data.value)
        }).catch((error) => {
            console.log(error)

            notifyError("Ошибка распределения: \n" + error.response.data.value)
        }).finally(() => {
            toggleRerender()
        })
    }

    useEffect(() => {
        if (pageChanged) {
            setPageChanged(false)
            return
        }

        getSegmentsOnPageWithFilter(rowsPerPage, page, filterElements).then((returned) => {
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

        }).catch(e => {
            logout()
            notifyError("Ошибка получения данных с сервера")
        }).finally(() => {

        })

    }, [page, rowsPerPage, rerender])

    return (
        <>
            {userRoles.includes("Admin") && <SegmentAdd
                handleSegmentAddValue={handleSegmentAddValue}
                segmentAddValue={segmentAddValue}
                handleAddSegment={handleAddSegment}
                isProcessAdd={isProcessAdd}
                handleSegmentDescription={handleSegmentDescription}
                segmentDescription={segmentDescription}
            />}

            <DistributeSegment
                handleSubmitRegexSegments={handleSubmitRegexSegments}
                handleSubmitPercentageSegments={handleSubmitPercentageSegments}
            />
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <SegmentTableToolBar
                        numSelected={selected.size}
                        handleDeleteSegments={handleDeleteSegments}
                    />
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <SegmentTableHead
                                numSelected={selected.size}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rowsAmount}
                                handleFilter={handleFilter}
                            />
                            {isLoading ? (
                                <LoadingProgressTable rowsPerPage={rowsPerPage}/>
                            ) : visible.length == 0 ? (
                                <EmptyTable/>
                            ) : (
                                <SegmentTableBody
                                    visibleRows={visible}
                                    selected={selected}
                                    handleClick={handleSelect}
                                    emptyRows={emptyRows}
                                    handleChangeName={handleChangeName}
                                    handleChangeDescription={handleChangeDescription}
                                    userRoles={userRoles}
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