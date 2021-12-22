import AxiosRequest from "@/helpers/axios/AxiosRequest";
import {
    PROVIDER_API_ACTIVE_PASSIVE_URL,
    PROVIDER_API_BASE_URL, PROVIDER_API_GET_ALL_ACTIVE_URL,
    PROVIDER_API_GET_ALL_URL
} from "@/constants/urls/providerEndpoints";

var axiosRequest = new AxiosRequest("http://localhost:8080");

export const providerService = {
    createMeetingProvider,
    getAll,
    getProviderById,
    updateProviderActivePassiveInfo,
    getActiveProviders,
    updateProvider,
    deleteProvider
};

async function createMeetingProvider(provider) {
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

    if (!response || !response.data) {
        return undefined;
    }

    return response.data;
}

async function getActiveProviders(roleGroups) {

    const response = await axiosRequest.post(
        PROVIDER_API_GET_ALL_ACTIVE_URL,
        roleGroups,
        {
            headers: {}
        }
    );

    if (!response || !response.data) {
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

    if (!response || !response.data) {
        return undefined;
    }
    return response.data;
}

async function updateProvider(id, provider) {
    await axiosRequest.put(
        PROVIDER_API_BASE_URL + `/${id}`,
        provider,
        {
            headers: {
                ContentType: {'Content-Type': 'application/json'}
            }
        }
    );
}

async function deleteProvider(id) {
    await axiosRequest.delete(
        PROVIDER_API_BASE_URL + `/${id}`,
        {},
        {
            headers: {
                ContentType: {'Content-Type': 'application/json'}
            }
        }
    );
}

async function updateProviderActivePassiveInfo(id, isActive) {
    await axiosRequest.put(
        PROVIDER_API_ACTIVE_PASSIVE_URL + `/${id}/${isActive}`,
        {},
        {
            headers: {
                ContentType: {'Content-Type': 'application/json'}
            }
        }
    );
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
