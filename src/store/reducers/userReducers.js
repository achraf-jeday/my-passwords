import * as actionTypes from '../actionTypes';

const initialState = {
    access_token:'',
    count: ''
}

export default function user_state(state = initialState, action) {

    switch(action.type) {
        case actionTypes.GET_TOKEN:
        return {
            ...state,
            access_token:action.payload
        }
        case actionTypes.GET_PASSWORDS:
        return {
            ...state,
            count:action.payload
        }
        default: return state;
    }

}
