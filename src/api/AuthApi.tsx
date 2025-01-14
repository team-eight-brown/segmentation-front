import axios from "axios";
import {BASE_URL} from "./UserApi";

export const authUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/login", data)
}

export const registerUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/register", data)
}