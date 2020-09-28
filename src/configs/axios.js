import Cookies from 'js-cookie';
import Axios from "axios";

const forceSignOut = () => {
    Cookies.remove("at");   //remove access token
    Cookies.remove("rt");   //remove refresh token
    // window.location = '/';
};

const isUserSignedIn = () => {
    return !!Cookies.get("at") && !!Cookies.get("rt");
};

const setAccessToken = accessToken => {
    Axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
};

const init = () => {
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
    if (Cookies.get("at")) {
        setAccessToken(Cookies.get("at"));
    }    

    Axios.interceptors.response.use((response) => { 
        return response;
    }, function (err) {
        let originalRequest = err.config;

        if (err.response.status === 401 && !originalRequest._retry) { 
            let isSignInRoute = originalRequest.url === originalRequest.baseURL + '/api/auth/sign-in';

            if (isSignInRoute && !isUserSignedIn()) return Promise.reject(err);

            originalRequest._retry = true;
            
            return Axios
                .request({
                    method: "POST",
                    url: "/api/services/auth/refresh-token",
                    data: {
                        refreshToken: Cookies.get('rt')
                    }
                })
                .then((response) => {
                    Cookies.set("at", response.data.data.accessToken);
                    Cookies.set("rt", response.data.data.refreshToken);

                    setAccessToken(response.data.data.accessToken);
                    originalRequest.headers['Authorization'] = "Bearer " + response.data.data.accessToken;
                    return Axios.request(originalRequest);
                })
                .catch((err) => {
                    // forceSignOut();
                    // window.location = '/';
                    return Promise.reject(err);
                })
        }
        return Promise.reject(err);
    });
}

export default {
    isUserSignedIn,
    forceSignOut,
    setAccessToken,
    init
};