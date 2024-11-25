import axios from "axios";
import {createData, Data} from "../components/segments/SegmentPage";
import {useState} from "react";
import {Id} from "react-toastify/dist/types";

const BASE_URL = 'https://url.com';

export const START_LENGTH = 1

let ROWS = generateRowsData(START_LENGTH)

function generateRowsData(c: number): Data[] {
    let ans: Data[] = []
    for (let j = 0; j < c; j++) {
        ans.push(createData(j * 200000, `NAME_SEGMENT${j}`))
    }
    return ans
}

export const testSegment = async () => {
    return await axios.post(BASE_URL + "/test", "{}");
};

export const addNewSegment = (text: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ROWS.push(createData(ROWS[ROWS.length - 1].id + 1, text))
            resolve(1);
        }, 1000);
    })

}

export const getSegmentsOnPage = (rowsPerPage, page) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([...ROWS].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        }, 1000);
    })

}

export const updateSegmentData = (id, newValue) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ROWS = ROWS.map((row) => {
                if (row.id == id){
                    return {
                        ...row,
                        name: newValue
                    }
                } else {
                    return row
                }
            })
            resolve(true);
        }, 1000);
    })
}

export const deleteSegments = (allSelected, ids: Id[]) => {
    return new Promise((resolve, reject) => {
        let count = 0

        if (allSelected){
            ROWS = ROWS.filter((row) => {
                if (ids.indexOf(row.id) !== -1){
                    return true
                }
                count++
                return false
            })
        } else {
            ROWS = ROWS.filter((row) => {
                if (ids.indexOf(row.id) !== -1){
                    count++
                    return false
                }
                return true
            })
        }



        setTimeout(() => {
            resolve(count)
        }, 1000);
    })
}

