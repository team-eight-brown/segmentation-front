import axios from "axios";
import {createData, Data} from "../components/segments/SegmentPage";

const BASE_URL = 'https://url.com';

export const testSegment = async () => {
    return await axios.post(BASE_URL + "/test", "{}");
};

export const addNewSegment = (allRows: Data[], newSegmentText: string) => {
    let lastIdx = allRows.length
    return createData(allRows[lastIdx - 1].id + 1, newSegmentText);
}


