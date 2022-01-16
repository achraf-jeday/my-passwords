import * as actionTypes from '../actionTypes';

const initialState = {
    user_state:'',
    cookie:'',
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
        case actionTypes.VERIFY_PACKING_KEY:
        return {
            ...state,
            cookie:action.payload
        }
        default: return state;
    }

}
