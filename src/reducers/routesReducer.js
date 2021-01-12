import { store } from '../configs/index';

const routesReducer = (routes = store.routes, action) => {
    if (action.type === 'SET_ROUTES') {
        let keys = Object.keys(action.data.labels)
        return {
            ...action.data,
            selectedRoute: keys[0]
        };
    } else if (action.type === 'SET_ROUTE') {
        return {
            ...routes,
            selectedRoute: action.data
        };
    } else if (action.type === 'RESET_ROUTES') {
        return {
            routes: [],
            selectedRoute: ''
        };
    } else {
        return routes;
    }
};

export default routesReducer;