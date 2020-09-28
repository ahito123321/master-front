import axios from 'axios';
import { googleMap } from '../configs/index';

export default {
    getPlaceDetilsByPosition: position => {
        return axios.request({
            method: "GET",
            url: "https://maps.google.com/maps/api/geocode/json",
            params: {
                key: googleMap.apiKey,
                latlng: `${position.lat},${position.lng}`,
                language: googleMap.language
            }});
    },
    searchPlacesByText: text => {
        return axios.request({
            method: "GET",
            url: "http://maps.googleapis.com/maps/api/place/autocomplete/json",
            params: {
                key: googleMap.apiKey,
                types: 'geocode',
                language: googleMap.language,
                input: text
            }});
    }
};