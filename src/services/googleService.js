import googleAPI from '../api/googleAPI';

const googleService = {
    getPlaceDetailsByPosition: position => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await googleAPI.getPlaceDetilsByPosition(position);
                resolve(response.data);
            } catch (error) {
                reject({
                    ...error.response,
                    message: 'Произошла ошибка при получении данных об объекте!'
                });
            }
        });
    },
    searchPlacesByText: text => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await googleAPI.searchPlacesByText(text);
                resolve(response.data);
            } catch (error) {
                reject({
                    ...error.response,
                    message: 'Произошла ошибка при получении данных!'
                });
            }
        });
    }
};

export default googleService;