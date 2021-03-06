// Add the Firebase products that you want to use
import Keycloak from "keycloak-js";

class KeycloakAuthBackend {
    constructor(keycloakConfig) {

    }

    /**
     * Logout the user
     */
    logout = () => {
        console.log("logout")
    }

    setLoggeedInUser = (user) => {
        sessionStorage.setItem("authUser", JSON.stringify(user));
    }
    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!sessionStorage.getItem('authUser'))
            return null;
        return JSON.parse(sessionStorage.getItem('authUser'));
    }

    /**
     * Handle the error
     * @param {*} error 
     */
    _handleError(error) {
        var errorMessage = error.message;
        return errorMessage;
    }
}

let keycloakBackend = null;

/**
 * Initilize the backend
 * @param {*} config 
 */
const initKeycloakBackend = (config) => {
    debugger;
    if (!keycloakBackend) {
        keycloakBackend = new KeycloakAuthBackend(config);
    }
    return keycloakBackend;
}

const getKeycloakBackend= () => {
    return keycloakBackend;
}

export { initKeycloakBackend, getKeycloakBackend };
