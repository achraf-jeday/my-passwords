import { GET_TOKEN, TOKEN_ERROR } from '../types';
import { GET_CSRF_TOKEN, CSRF_TOKEN_ERROR } from '../types';
import { REGISTER_USER, REGISTER_USER_ERROR } from '../types';
import axios from 'axios';
import querystring from 'querystring';

export const getAccessToken = (email, password) => async dispatch => {

    const data = {
        grant_type: "password",
        client_id: "3aa7c57d-21d7-4117-974e-ab60c82a24fd",
        client_secret: "SuperSecret123&",
        scope: "customer",
        username: email,
        password: password
    };

    try {
        const response = await axios.post(`http://dev.passwordlocker.loc/oauth/token`, querystring.stringify(data));
        dispatch( {
            type: GET_TOKEN,
            payload: response.data.access_token
        });
    }
    catch(e) {
        dispatch( {
            type: TOKEN_ERROR,
            payload: console.log(e),
        })
    }

}

export const getCSRFToken = () => async dispatch => {

    try {
        const response = await axios.get(`http://dev.passwordlocker.loc/session/token`);
        dispatch( {
            type: GET_CSRF_TOKEN,
            payload: response.data
        });
    }
    catch(e) {
        dispatch( {
            type: CSRF_TOKEN_ERROR,
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
            type: REGISTER_USER,
            payload: response
        });
    }
    catch(e) {
        dispatch( {
            type: REGISTER_USER_ERROR,
            payload: console.log(e),
        })
    }

}
