import * as actionTypes from '../actionTypes';
import axios from 'axios';
import querystring from 'querystring';

export const getAccessToken = (email, password) => async dispatch => {

    const data = {
        grant_type: "password",
        client_id: "0780aedc-cefa-4603-81bf-a9fd35cd702d",
        client_secret: "SuperSecret123&",
        scope: "customer",
        username: email,
        password: password
    };

    try {
        const response = await axios.post(`http://dev.passwordlocker.loc/oauth/token`, querystring.stringify(data));
        dispatch({
            type: actionTypes.GET_TOKEN,
            payload: response.data.access_token
        });
        return response.data.access_token;
    }
    catch(e) {
        dispatch({
            type: actionTypes.TOKEN_ERROR,
            payload: console.log(e),
        })
    }

}

export const deleteAccessToken = () => async dispatch => {
   dispatch({
      type: actionTypes.DELETE_TOKEN
   })
}

export const getCSRFToken = () => async dispatch => {

    try {
        const response = await axios.get(`http://dev.passwordlocker.loc/session/token`);
        dispatch( {
            type: actionTypes.GET_CSRF_TOKEN,
            payload: response.data
        });
        return response.data;
    }
    catch(e) {
        dispatch( {
            type: actionTypes.CSRF_TOKEN_ERROR,
            payload: console.log(e),
        })
    }

}

export const verifyUserPackingKey = (csrf, access_token) => async dispatch => {
    const data = JSON.stringify({
        "packing_key": "SuperSecret123!"
    });

    let config = {
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-Token': csrf,
            'Authorization': 'Bearer ' + access_token
        }
    }

    try {
        const response = await axios.post(`http://dev.passwordlocker.loc/user/packing-key?_format=json`, data, config);
        dispatch( {
            type: actionTypes.VERIFY_PACKING_KEY,
            payload: response
        });
    }
    catch(e) {
        dispatch( {
            type: actionTypes.VERIFY_PACKING_KEY_ERROR,
            payload: console.log(e),
        })
    }
}

export const registerUser = (name, mail, csrf) => async dispatch => {

    const data = JSON.stringify({
      "name": {
        "value": name
      },
      "mail": {
        "value": mail
      },
      "pass": {
        "value": "SuperSecret123&"
      }
    });

    let config = {
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-Token': csrf
        }
    }

    try {
        const response = await axios.post(`http://dev.passwordlocker.loc/user/register?_format=json`, data, config);
        dispatch( {
            type: actionTypes.REGISTER,
            payload: response
        });
    }
    catch(e) {
        dispatch( {
            type: actionTypes.REGISTER_ERROR,
            payload: console.log(e),
        })
    }

}

export const registerEmail = (mail) => async dispatch => {

    const data = JSON.stringify({
        "mail": mail
    });

    let config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post(`http://dev.passwordlocker.loc/user/lost-password?_format=json`, data, config);
        dispatch( {
            type: actionTypes.REGISTER_EMAIL,
            payload: response
        });
    }
    catch(e) {
        dispatch( {
            type: actionTypes.REGISTER_EMAIL_ERROR,
            payload: console.log(e),
        })
    }

}

export const resetPass = (name, temp_pass, new_pass) => async dispatch => {

    const data = JSON.stringify({
        "name": name,
        "temp_pass": temp_pass,
        "new_pass": new_pass
    });

    let config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post(`http://dev.passwordlocker.loc/user/lost-password-reset?_format=json`, data, config);
        dispatch( {
            type: actionTypes.RESET_PASSWORD,
            payload: response
        });
    }
    catch(e) {
        dispatch( {
            type: actionTypes.RESET_PASSWORD_ERROR,
            payload: console.log(e),
        })
    }

}

export const getPasswordsList = (access_token, page, page_size) => async dispatch => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }

    axios.defaults.withCredentials = true;

    let offset = page * page_size;

    try {
        const response = await axios.get('http://dev.passwordlocker.loc/api/json/password?page[limit]=' + page_size + '&page[offset]=' + offset, config);
        dispatch( {
            type: actionTypes.GET_PASSWORDS,
            payload: response
        });
        var rows = [];
        response.data.data.forEach(obj => {
            rows.push(obj.attributes);
        });
        return rows;
    }
    catch(e) {
        dispatch( {
            type: actionTypes.GET_PASSWORDS_ERROR,
            payload: console.log(e),
        })
    }
}

export const getPassword = (access_token) => async dispatch => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }

    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get('http://dev.passwordlocker.loc/api/json/password/ff585b43-a81d-456b-978c-c10100f32a19', config);
        dispatch( {
            type: actionTypes.GET_PASSWORD,
            payload: response
        });
        return response;
    }
    catch(e) {
        dispatch( {
            type: actionTypes.GET_PASSWORD_ERROR,
            payload: console.log(e),
        })
    }
}

export const updatePasswordAction = (csrf, access_token, fields) => async dispatch => {
    var data = JSON.stringify({
        "data": {
            "type": "password--password",
            "id": fields['uuid'],
            "attributes": {
                "status": false,
                "name": fields['name'],
                "field_email": fields['email'],
                "field_link": fields['link'],
                "field_notes": fields['notes'],
                "field_password": fields['password'],
                "field_user_id": fields['user-id']
            }
        }
    });

    let config = {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Authorization': 'Bearer ' + access_token,
            'X-CSRF-Token': csrf
        }
    }

    axios.defaults.withCredentials = true;

    try {
        const response = await axios.patch('http://dev.passwordlocker.loc/api/json/password/' + fields['uuid'], data, config);
        dispatch( {
            type: actionTypes.UPDATE_PASSWORD,
            payload: response
        });
    }
    catch(e) {
        dispatch( {
            type: actionTypes.UPDATE_PASSWORD_ERROR,
            payload: console.log(e),
        })
    }
}
