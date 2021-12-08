import AxiosRequest from "@/helpers/axios/AxiosRequest";
import {
    MEETING_API_BASE_URL,
    MEETING_API_GET_ALL_SLOTS_URL,
    MEETING_API_GET_ALL_URL,
    MEETING_SLOT_URL
} from "../../constants/urls/meetingEndpoints";
const axiosRequest = new AxiosRequest("http://localhost:8080");

export const meetingService = {
    createMeeting,
    getMeetingsBtwDates,
    getMeetingById,
    createChangeSlotRequest,
    getSlotRequests
};

async function  createMeeting(meeting) {
   const response = await axiosRequest.post(
       MEETING_API_BASE_URL,
        meeting,
        {
            headers: {}
        }
    );
   return response.data;
}
async function  createSlotRequestApproval(slotRequets,isApproved) {
   const response = await axiosRequest.post(
       MEETING_API_BASE_URL,
        meeting,
        {
            headers: {}
        }
    );
   return response.data;
}
async function  createChangeSlotRequest(changeSlotRequest) {
   const response = await axiosRequest.post(
       MEETING_SLOT_URL,
       changeSlotRequest,
        {
            headers: {}
        }
    );
   return response.data;
}
async function getMeetingsBtwDates(start,end) {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const response = await axiosRequest.get(
        MEETING_API_GET_ALL_URL,
        {
            params: {
                start,
                end
            },
            headers: {}
        }
    );

    if (!response || !response.data){
        return undefined;
    }

    return response.data;
}
async function getMeetingById(id) {

    const response = await axiosRequest.get(
        `${MEETING_API_BASE_URL}/${id}`,
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
async function getSlotRequests(meetingId) {

    const response = await axiosRequest.get(
        `${MEETING_API_GET_ALL_SLOTS_URL}/${meetingId}`,
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
