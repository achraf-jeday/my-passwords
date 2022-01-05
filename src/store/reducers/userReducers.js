import { GET_TOKEN } from '../types';

const initialState = {
    user_state:'',
}

export default function user_state(state = initialState, action) {

    switch(action.type) {

        case GET_TOKEN:
        return {
            ...state,
            user_state:action.payload

        }
        default: return state
    }

}
