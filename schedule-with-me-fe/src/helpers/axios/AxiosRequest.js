import axios from 'axios';

export const HTTP_METHODS = Object.freeze(
    { GET: 'get', POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete', HEAD: 'head' });

class AxiosRequest {
  constructor(url) {
    this.url = url;
  }

  doRequest(path, method, data, headers, params) {
    let user = JSON.parse(sessionStorage.getItem("authUser"));
    const _headers = headers ? headers : {};
    if (!_headers['Content-Type']) {
      _headers['Content-Type'] = 'application/json';
    }
    if(user.token && !_headers['Authorization']){
      _headers['Authorization'] = `Bearer ${
          user.token
      }`
    }

    return axios({
      method,
      url: this.url + path,
      headers: _headers,
      data: data,
      params
    });
  }

  get(path, { params, headers } = {}) {
    return this.doRequest(path, HTTP_METHODS.GET, undefined, headers, params);
  }

  post(path, data, { params, headers } = {}) {
    return this.doRequest(path, HTTP_METHODS.POST, data, headers, params);
  }

  put(path, data, { params, headers } = {}) {
    return this.doRequest(path, HTTP_METHODS.PUT, data, headers, params);
  }

  patch(path, data, { params, headers } = {}) {
    return this.doRequest(path, HTTP_METHODS.PATCH, data, headers, params);
  }

  delete(path, data, { params, headers } = {}) {
    return this.doRequest(path, HTTP_METHODS.DELETE, data, headers, params);
  }

  head(path, data, { params, headers } = {}) {
    return this.doRequest(path, HTTP_METHODS.HEAD, data, headers, params);
  }
}

export default AxiosRequest;
