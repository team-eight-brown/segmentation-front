import axios from "axios";

export const BASE_URL = 'http://localhost:8090/api/v1/';

export const instance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("user").replace("\"", "")}`
        return config
    }
)

export const addNewSegmentToUser = (userId, segmentId) => {
    return instance.post("segments/" + segmentId + "/users", {userId})
}

export const getSegmentsOnUserPage = (userId, rowsPerPage, page) => {
    return instance.get("segments/users/" + userId + "?sort=id&page=" + (page) + "&size=" + rowsPerPage);
}

export const deleteSegment = (userId, segmentId) => {
    return instance.delete("segments/" + segmentId + "/users?userId=" + userId, {data: {userId}})
}

export const setAdmin = (id) => {
    return instance.post("users/analyst/set-role", {roleId: "1", userId: id})
}

export const deleteAdmin = (id) => {
    return instance.post("users/analyst/remove-role", {roleId: "1", userId: id})
}
