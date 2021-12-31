import { GET_TOKEN, TOKEN_ERROR } from '../types';
import axios from 'axios';
import querystring from 'querystring';

export const getAccessToken = (email, password) => async dispatch => {

    const data = {
        grant_type: "password",
        client_id: "4520791a-1ce0-4dfe-9f50-a6e7beb6c318",
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
