import * as actionTypes from '../actionTypes';

const initialState = {
    access_token:'',
    rows: '',
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

        var rows = [];
        action.payload.data.data.forEach(obj => {
            rows.push(obj.attributes);
        });

        return {
            ...state,
            rows:rows,
            count:action.payload.data.meta.count
        }
        default: return state;
    }

}
