import { authHeader } from './auth-header';
import axios from 'axios';
import AxiosRequest from "@/helpers/axios/AxiosRequest";

export const meetingService = {
    createMeeting,
    getAll,
    getMeetingById
};

async function  createMeeting(meeting) {
    var axiosRequest = new AxiosRequest("http://localhost:8080");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meeting)
    };
   const response = await axiosRequest.post(
        '/meetings/create',
        meeting,
        {
            headers: {
                ContentType: { 'Content-Type': 'application/json' }
            }
        }
    );
   return response.data;
}
async function getAll() {
    let user = JSON.parse(sessionStorage.getItem("authUser"));
    var axiosRequest = new AxiosRequest("http://localhost:8080");

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const response = await axiosRequest.get(
        `/meetings/`,
        {

            headers: {
                ContentType: { 'Content-Type': 'application/json' },
                Authorization: `Bearer ${
                    user.token
                }`
            }
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function getMeetingById(id) {

    var axiosRequest = new AxiosRequest("http://localhost:8080");

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const response = await axiosRequest.get(
        `/meetings/${id}`,
        {

            headers: {
                ContentType: { 'Content-Type': 'application/json' },
            }
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