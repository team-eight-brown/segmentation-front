import axios from "axios";
import {BASE_URL, instance} from "./UserApi";

export const authUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/login", data)
}

export const registerUser = async (data: any) => {
    return axios.post(BASE_URL + "auth/register", data)
}

export const rolesUser = async () => {
    return instance.get("users/analyst/get-current")
}