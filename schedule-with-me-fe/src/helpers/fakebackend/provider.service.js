import AxiosRequest from "@/helpers/axios/AxiosRequest";

export const providerService = {
    createMeetingProvider,
    getAll,
    createProviderWithFileCredentials
};

async function  createMeetingProvider(provider) {
    var axiosRequest = new AxiosRequest("http://localhost:8080");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(provider)
    };
    await axiosRequest.post(
        '/meeting-provider/create',
        provider,
        {
            headers: {
                ContentType: { 'Content-Type': 'application/json' }
            }
        }
    );
}
async function  createProviderWithFileCredentials(meetingProvider,file) {
    var axiosRequest = new AxiosRequest("http://localhost:8080");
    let formData = new FormData();
    formData.append("file", file);
    formData.append('meetingProviderDTO',
        new Blob([JSON.stringify(meetingProvider)], {
        type: "application/json"
    }));

    // formData.append('file', file);
    await axiosRequest.post(
        '/meeting-provider/create-with-files',
        formData,

        {
            headers: {
                ContentType: { 'Content-Type': 'multipart/form-data' }
            }
        }
    );
}
async function getAll() {

    var axiosRequest = new AxiosRequest("http://localhost:8080");
    let user = JSON.parse(sessionStorage.getItem("authUser"));

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const response = await axiosRequest.get(
        `/meeting-provider/`,
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
