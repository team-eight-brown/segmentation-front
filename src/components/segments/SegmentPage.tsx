import {Container, ThemeProvider} from "@mui/material";
import theme from "../../theme/Theme";
import SegmentTable from "./table/SegmentTable";
import SegmentAdd from "./components/SegmentAdd";
import {useEffect, useRef, useState} from "react";
import {notifyError} from "../../toast/Notifies";

export interface Data {
    id: number;
    name: string;
}

export function createData(id: number, name: string): Data {
    return {id, name};
}

export function generateRowsData(c: number): Data[] {
    let ans: Data[] = []
    for (let j = 0; j < c; j++) {
        ans.push(createData(j * 200000, `NAME_SEGMENT${j}`))
    }
    return ans
}

const SegmentPage = () => {
    const [segmentAddValue, setSegmentAddValue] = useState("");
    const [isProcessAdd, setIsProcessAdd] = useState(false)

    const [allRows, setAllRows] = useState(generateRowsData(123))

    const handleSegmentAddValue = (e) => {
        setSegmentAddValue(e.target.value)
    }

    const handleAddSegment = () => {
        if (segmentAddValue.trim() === ""){
            notifyError("Пустое поле")
            return
        } else {
            console.log(allRows)
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <SegmentAdd
                        handleSegmentAddValue={handleSegmentAddValue}
                        segmentAddValue={segmentAddValue}
                        handleAddSegment={handleAddSegment}
                        isProcessAdd={isProcessAdd}/>

                    <SegmentTable
                        rows={allRows}
                        setRows={setAllRows}
                    />
                </Container>
            </ThemeProvider>
        </>
    );
};

export default SegmentPage;