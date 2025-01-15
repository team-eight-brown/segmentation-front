import {instance} from "./UserApi";

export interface filters {
    idFilter?: string,
    loginFilter?: string,
    emailFilter?: string,
    ipFilter?: string,
    segmentFilter?: string
}

export const getFullUsersOnPage = (rowsPerPage, page, filter) => {
    let filterId = filter.idFilter ? "&id=" + filter.idFilter : "";
    let filterName = filter.loginFilter ? "&login=" + filter.loginFilter : "";
    let filterDesc = filter.emailFilter ? "&email=" + filter.emailFilter : "";
    let filterIp = filter.ipFilter ? "&ip_address=" + filter.ipFilter : "";
    let filterSegment = filter.segmentFilter ? "&segment_name=" + filter.segmentFilter : "";

    return instance.get("users/get-all?sort=id&page=" + (page) + "&size=" +
        rowsPerPage + filterId + filterName + filterDesc + filterIp + filterSegment);
}