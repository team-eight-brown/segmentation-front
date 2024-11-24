import {toast} from "react-toastify";

export const notifyInfo = (text: String) => {
    toast(text, {type: "info"});
}

export const notifySuccess = (text: String) => {
    toast(text, {type: "success"});
}

export const notifyError = (text: String) => {
    toast(text, {type: "error"});
}