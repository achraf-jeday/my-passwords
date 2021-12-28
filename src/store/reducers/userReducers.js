import { GET_TOKEN } from '../types';

const initialState = {
    access_token:'',
}

export default function access_token(state = initialState, action) {

    switch(action.type) {

        case GET_TOKEN:
        return {
            ...state,
            access_token:action.payload

        }
        default: return state
    }

}
