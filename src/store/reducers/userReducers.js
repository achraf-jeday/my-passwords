import * as actionTypes from '../actionTypes';

const initialState = {
    user_state:'',
}

export default function user_state(state = initialState, action) {

    switch(action.type) {
        case actionTypes.GET_TOKEN:
        return {
            ...state,
            user_state:action.payload
        }
        case actionTypes.DELETE_TOKEN:
        return initialState;
        default: return state;
    }

}
