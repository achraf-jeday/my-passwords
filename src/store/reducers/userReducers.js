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
            let changed = new Date(obj.attributes.changed);
            changed = changed.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            });
            obj.attributes.changed = changed;
            let created = new Date(obj.attributes.created);
            created = created.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            });
            obj.attributes.created = created;
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
