import AxiosRequest from "@/helpers/axios/AxiosRequest";
import {PROVIDER_API_BASE_URL, PROVIDER_API_GET_ALL_URL} from "@/constants/urls/providerEndpoints";
var axiosRequest = new AxiosRequest("http://localhost:8080");

export const providerService = {
    createMeetingProvider,
    getAll,
    getProviderById
};

async function  createMeetingProvider(provider) {
    await axiosRequest.post(
        PROVIDER_API_BASE_URL,
        provider,
        {
            headers: {}
        }
    );
}
async function getAll() {

    const response = await axiosRequest.get(
        PROVIDER_API_GET_ALL_URL,
        {
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function getProviderById(id) {

    const response = await axiosRequest.get(
        `${PROVIDER_API_BASE_URL}/${id}`,
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
