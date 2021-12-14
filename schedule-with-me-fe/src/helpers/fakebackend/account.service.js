import AxiosRequest from "@/helpers/axios/AxiosRequest";
import {
    GOOGLE_API_ACTIVE_PASSIVE_URL,
    GOOGLE_API_BASE_URL, GOOGLE_API_GET_ACTIVE_ACCOUNT_URL,
    GOOGLE_API_GET_ALL_URL
} from "@/constants/urls/googleEndpoints";
import {
    ZOOM_API_ACTIVE_ACCOUNTS_URL,
    ZOOM_API_ACTIVE_PASSIVE_URL,
    ZOOM_API_BASE_URL,
    ZOOM_API_GET_ALL_URL
} from "@/constants/urls/zoomEndpoints";
const axiosRequest = new AxiosRequest("http://localhost:8080");
export const accountService = {
    createZoomAccount,
    getGoogleAccounts,
    getZoomAccounts,
    createGoogleAccount,
    findGoogleAccountById,
    findZoomAccountById,
    updateGoogleAccount,
    updateZoomAccount,
    updateGoogleAccountActivePassiveInfo,
    updateZoomAccountActivePassiveInfo,
    getActiveZoomAccounts,
    getActiveGoogleAccount,
    deleteGoogleAccount,
    deleteZoomAccount
};
//TODO google-zoom servislerini ayır
async function  createZoomAccount(account) {
    await axiosRequest.post(
        ZOOM_API_BASE_URL,
        account,
        {
            headers: {}
        }
    );
}
async function  updateZoomAccount(account) {
    await axiosRequest.put(
        ZOOM_API_BASE_URL+ `/${account.id}`,
        account,
        {
            headers: {
                ContentType: { 'Content-Type': 'application/json' }
            }
        }
    );
}
async function  updateZoomAccountActivePassiveInfo(id,isActive) {
    await axiosRequest.put(
        ZOOM_API_ACTIVE_PASSIVE_URL+ `/${id}/${isActive}`,
        {},
        {
            headers: {
                ContentType: { 'Content-Type': 'application/json' }
            }
        }
    );
}
async function  updateGoogleAccountActivePassiveInfo(id,isActive) {
    await axiosRequest.put(
        GOOGLE_API_ACTIVE_PASSIVE_URL+ `/${id}/${isActive}`,
        {},
        {
            headers: {
                ContentType: { 'Content-Type': 'application/json' }
            }
        }
    );
}
async function  createGoogleAccount(meetingAccount,file) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append('googleAccountDTO',
        new Blob([JSON.stringify(meetingAccount)], {
        type: "application/json"
    }));

    // formData.append('file', file);
    await axiosRequest.post(
        GOOGLE_API_BASE_URL,
        formData,

        {
            headers: {
                ContentType: { 'Content-Type': 'multipart/form-data' },
            }
        }
    );
}
async function  updateGoogleAccount(meetingAccount,file) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append('googleAccountDTO',
        new Blob([JSON.stringify(meetingAccount)], {
        type: "application/json"
    }));

    // formData.append('file', file);
    await axiosRequest.put(
        GOOGLE_API_BASE_URL+ `/${meetingAccount.id}`,
        formData,

        {
            headers: {
                ContentType: { 'Content-Type': 'multipart/form-data' }
            }
        }
    );
}
async function getGoogleAccounts() {

    const response = await axiosRequest.get(
        GOOGLE_API_GET_ALL_URL,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function getActiveGoogleAccount() {

    const response = await axiosRequest.get(
        GOOGLE_API_GET_ACTIVE_ACCOUNT_URL,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function deleteGoogleAccount(id) {

    const response = await axiosRequest.delete(
        GOOGLE_API_BASE_URL + `/${id}`,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function deleteZoomAccount(id) {

    const response = await axiosRequest.delete(
        ZOOM_API_BASE_URL + `/${id}`,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function findGoogleAccountById(id) {

    const response = await axiosRequest.get(
        GOOGLE_API_BASE_URL + `/${id}`,
        {
            headers: {}
        }
    );
    return response.data;
}
async function findZoomAccountById(id) {

    const response = await axiosRequest.get(
        ZOOM_API_BASE_URL+`/${id}`,
        {
            headers: {}
        }
    );
    if (!response || !response.data){
        return undefined;
    }
    return response.data;
}
async function getZoomAccounts() {

    var axiosRequest = new AxiosRequest("http://localhost:8080");
    const response = await axiosRequest.get(
        ZOOM_API_GET_ALL_URL,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function getActiveZoomAccounts() {

    var axiosRequest = new AxiosRequest("http://localhost:8080");
    const response = await axiosRequest.get(
        ZOOM_API_ACTIVE_ACCOUNTS_URL,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        // if (!response.ok) {
        //     if (response.status === 401) {
        //         // auto logout if 401 response returned from api
        //         logout();
        //         location.reload(true);
        //     }
        //     const error = (data && data.message) || response.statusText;
        //     return Promise.reject(error);
        // }
        return data;
    });
}
