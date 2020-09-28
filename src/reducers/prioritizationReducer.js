import { store } from '../configs/index';

const prioritizationReducer = (prioritization = store.prioritization, action) => {
    if (action.type === 'SET') {
        return {
            ...prioritization,
            [action.data.key]: action.data.value 
        };
    } else {
        return prioritization;
    }
};

export default prioritizationReducer;