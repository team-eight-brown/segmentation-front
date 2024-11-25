import {Container, ThemeProvider} from "@mui/material";
import theme from "../../theme/Theme";
import SegmentTable from "./table/SegmentTable";
import SegmentAdd from "./components/SegmentAdd";
import {useEffect, useRef, useState} from "react";
import {notifyError, notifyLoading, updateSuccess} from "../../toast/Notifies";
import {addNewSegment, START_LENGTH} from "../../api/SegmentApi";
import {toast} from "react-toastify";

export interface Data {
    id: number;
    name: string;
}

export function createData(id: number, name: string): Data {
    return {id, name};
}

const SegmentPage = () => {
    const [segmentAddValue, setSegmentAddValue] = useState("");
    const [isProcessAdd, setIsProcessAdd] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(0)

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value.trim())
    }

    useEffect(() => {
        setRowsAmount(START_LENGTH)
    }, []);

    const handleAddSegment = () => {
        if (segmentAddValue === ""){
            notifyError("Пустое поле")
            return
        }

        setIsProcessAdd(true);

        const id = notifyLoading("Добавление элемента");

        addNewSegment(segmentAddValue).then((e : number)=>{
            updateSuccess(id, "Элемент добавлен")
            setRowsAmount(amount=> amount + e)
        }).finally(()=>{
            setIsProcessAdd(false);
        })
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <SegmentAdd
                        handleSegmentAddValue={handleSegmentAddValue}
                        segmentAddValue={segmentAddValue}
                        handleAddSegment={handleAddSegment}
                        isProcessAdd={isProcessAdd}
                    />
                    <SegmentTable
                        rowsAmount={rowsAmount}
                        setRowsAmount={setRowsAmount}
                    />
                </Container>
            </ThemeProvider>
            <div> Вопрос про контролл флоу: <br/>
                Есть toast, который всплывает по факту окончания вызова API1, то есть до вызова получения данных с сервера или после их получения? <br/>
                2 примера, add и change elem
            </div>
        </>
    );
};

export default SegmentPage;