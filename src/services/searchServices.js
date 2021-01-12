import searchAPI from '../api/searchAPI';

const googleService = {
    getRoutes: body => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await searchAPI.getRoutes(body);
                resolve(response.data);
            } catch (error) {
                reject({
                    message: 'Произошла ошибка при получении расчёте данных! Проверьте введённые данные!',
                    ...error.response,
                });
            }
        });
    }
};

export default googleService;