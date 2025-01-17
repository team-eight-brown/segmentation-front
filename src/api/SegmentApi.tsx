import {instance} from "./UserApi";

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
    idFilter? : string,
    descriptionFilter? : string
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
    let filterId = filter.idFilter? "&id=" + filter.idFilter : "";
    let filterName = filter.nameFilter? "&name=" + filter.nameFilter : "";
    let filterDesc = filter.descriptionFilter? "&description=" + filter.descriptionFilter : "";

    return instance.get("segments?sort=id&page=" + (page) + "&size=" + rowsPerPage + filterId + filterName + filterDesc);
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

export const deleteSegments = (id /*ids: Set<Id>*/) => {

    return instance.delete("segments/" + id)
}


export const distribute = (data) => {
    return instance.post("filter/distribute", {type: data.regexType, regexp: data.regex, segmentId: data.segment})
}

export const distributeRandom = (data) => {
    return instance.post("segments/distribute-random", {percentage: data.percentage, segmentName: data.segmentName})
}

