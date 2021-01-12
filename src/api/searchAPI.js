import axios from 'axios';

export default {
    getRoutes: body => {
        return axios.request({
            method: "POST",
            url: "http://localhost:8000/api/route/",
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });
    }
};