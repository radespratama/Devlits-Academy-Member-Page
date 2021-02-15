import { POPULATE_PROFILE } from 'API/types/users';

const initialState = null

const ReducersUsers = (state = initialState, action) => {
    switch (action.type) {
        case POPULATE_PROFILE:
            
            return(action.payload);
    
        default:
            return state;
    }
}

export default ReducersUsers