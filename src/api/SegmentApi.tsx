import axios from "axios";
import {BASE_URL} from "./UserApi";

export const instance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("user").replace("\"", "")}`
        return config
    }
)


export interface Data {
    id: number;
    name: string;
    description: string;
}

export interface ReturnData{
    data: Data[];
    rows: number;
}

export function createData(id: number, name: string): Data {
    return {id, name, description : "test"};
}

export const START_LENGTH = 110

export interface filters {
    nameFilter? : string,
    idFilter? : string
}

let ROWS = generateRowsData(START_LENGTH)

function generateRowsData(c: number): Data[] {
    let ans: Data[] = []
    for (let j = 0; j < c; j++) {
        ans.push(createData(j * 200000, `NAME_SEGMENT${j}`))
    }
    return ans
}
export const addNewSegment = (text1: string, text2: string) => {
    return instance.post("segments", {name: text1, description: text2})
}

export const getSegmentsOnPageWithFilter = (rowsPerPage, page, filter : filters) => {
    return instance.get("segments?sort=id&page=" + (page) + "&size=" + rowsPerPage);
}

export const getSegmentsOnPage = (rowsPerPage, page) => {
    let filter : filters = {
        idFilter : "",
        nameFilter : ""
    }
    return getSegmentsOnPageWithFilter(rowsPerPage, page, filter)

}

export const updateSegmentData = (id, data) => {
    return instance.put("segments/" + id, data)
}

export const deleteSegments = (allSelected: boolean, id /*ids: Set<Id>*/) => {

    return instance.delete("segments/" + id)
}


export const distribute = (data) => {
    return instance.post("filter/distribute", {type: data.regexType, regexp: data.regex, segmentId: data.segment})
}

export const distributeRandom = (data) => {
    return instance.post("segments/distribute-random", {percentage: data.percentage, segmentName: data.segmentName})
}

export const authUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/login", data)
}

export const registerUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/register", data)
}
