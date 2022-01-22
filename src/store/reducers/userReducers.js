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
            obj.attributes.id = obj.attributes.drupal_internal__id;
            delete obj.attributes.drupal_internal__id;
            let field_link = obj.attributes.field_link.uri;
            delete obj.attributes.field_link;
            obj.attributes.field_link = field_link;
            obj.attributes.uuid = obj.id;
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
