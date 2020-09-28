import { store } from '../configs/index';

const settingsReducer = (settings = store.settings, action) => {
    if (action.type === 'SET') {
        return {
            ...settings,
            [action.data.key]: action.data.value 
        };
    } else if (action.type === 'SET_NUMBERS') {
        return {
            ...settings,
            [action.data.key]: action.data.value 
        };
    } else {
        return settings;
    }
};

export default settingsReducer;