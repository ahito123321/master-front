import userReducer from './userReducer';
import pointsReducer from './pointsReducer';
import prioritizationReducer from './prioritizationReducer';
import settingsReducer from './settingsReducer';
import routesReducer from './routesReducer';

export default {
    user: userReducer,
    points: pointsReducer,
    prioritization: prioritizationReducer,
    settings: settingsReducer,
    routes: routesReducer
};