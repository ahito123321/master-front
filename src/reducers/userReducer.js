import { store } from '../configs/index';

const userReducer = (user = store.user, action) => {
    if (action.type === 'SET_AUTHENTICATE_STATUS') {
        return {
            ...user,
            isAuthenticated: action.data
        };
    } else {
        return user;
    }
};

export default userReducer;