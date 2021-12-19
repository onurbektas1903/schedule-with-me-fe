import AxiosRequest from "@/helpers/axios/AxiosRequest";

export default class KeycloakUserApi {
  constructor() {
    this.axiosRequest = new AxiosRequest('http://localhost:8888/auth/admin/realms/obss-scheduler');
  }

  async getAllUsers({  } = {}) {
    const response = await this.axiosRequest.get(
      `/users`,
      {
        headers: {},
      }
    );

    return response && response.data ? response.data : undefined;
  }
  async getAllRoleGroups({  } = {}) {
    const response = await this.axiosRequest.get(
      `/groups`,
      {
        headers: {},
      }
    );

    return response && response.data ? response.data : undefined;
  }

  async getAllEnabledUsers({ realm, token } = {}) {
    const data = await this.getAllUsers({ realm, token });

    if (!data){
        return undefined;
    }

    return data.filter(user => user.enabled);
  }

  async getAllNotEnabledUsers({ realm, token } = {}) {
    const data = await this.getAllUsers({ realm, token });

    if (!data){
        return undefined;
    }

    return data.filter(user => !user.enabled);
  }

}
