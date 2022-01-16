import * as actionTypes from '../actionTypes';
import axios from 'axios';
import querystring from 'querystring';

export const getAccessToken = (email, password) => async dispatch => {

    const data = {
        grant_type: "password",
        client_id: "5272db5d-c7b6-45fb-a3bd-74fc66b8434a",
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
    }
    catch(e) {
        dispatch( {
            type: actionTypes.CSRF_TOKEN_ERROR,
            payload: console.log(e),
        })
    }

}

export const verifyUserPackingKey = (email, password) => async dispatch => {

    const data = JSON.stringify({
        "packing_key": "SuperSecret123!"
    });

    let config = {
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-Token': csrf
            'X-CSRF-Token': 'eaRdIF7W1rw446QS8HKP_62kmnyEm2a4cZLoBPecDOQ', 
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4YmQ0ZDEwZGQ5YzlhMGVlZTZkMTE2NGIxZDQ1YmJiMGI0NzgzZmNhNTc3NDMyZTA0ZTBjNzczYTc5NDc3ZTc2MWM4NGI5ZWJmMmY4MzljIn0.eyJhdWQiOiI1MjcyZGI1ZC1jN2I2LTQ1ZmItYTNiZC03NGZjNjZiODQzNGEiLCJqdGkiOiJmOGJkNGQxMGRkOWM5YTBlZWU2ZDExNjRiMWQ0NWJiYjBiNDc4M2ZjYTU3NzQzMmUwNGUwYzc3M2E3OTQ3N2U3NjFjODRiOWViZjJmODM5YyIsImlhdCI6MTY0MjM2NDc3NiwibmJmIjoxNjQyMzY0Nzc2LCJleHAiOjE2NDUzNjQ3NzYuNDgzNDIsInN1YiI6IjIiLCJzY29wZSI6WyJjdXN0b21lciIsImF1dGhlbnRpY2F0ZWQiXX0.ZxRV4aC4V_2JUJzZOnaIq0RuPsM9yzmu46yNoRarq1yS3wly5LoqPT297DeRHSeIki4YF9clJDFaoFhPZ1B7Zzu9iPeZLhVbbUodYTXnKeJJM9WGxqGPOGxXqQXK-ilb0lgyx_zB4vRzKBlrsIKnEUhNzH_Dz-I7vxHHmaNvbTayBqOkf2-ergJMaFQqcLZjyVcfpZfLqWfmx3BlI8B-buZBn2wAX10Yh987P0m2h-C5fyKykPKo290KQTvSOO-86_TrmmqWGiI0hOR56ws11BbG6FF_zt75RG537D5Rj9u2pWwQZsSWiCxviZcHjuz-kUttsGxoY6mDE0dNplcI0Et6_xZCuFyLcDwCXcksNMZJmvCcMZcrHkmOU2HB13LZsDhDHnXwnBQgaIRJRNJ-gZQCSmmbb4d5eEtme3XAOlWJFX8LgMukTIIPauqEa9r6cF52h3g_IZnbMMEQdgAsTUtcGV3IdXxEsUj-O4H9-SD7hdNQ4_7nHJ0Ro66p4nvJs1y0cq4IBYaAVlLq3UvXrj8iACYz3vOcqgr4d1J6_HtwtrAn703QpXdls8MWHWHbujRFi_B-TPIcDnnhzZ0J3DfqC15dMVxSucoCqvyHyqjcJCmR1SVdYsETgPR6Pg1Cv6kGsq6VSg35-QHwZ1-okWlhFoknPVdpqquOVpKRa2w', 
            'Cookie': 'SESS0decf1a80ec6658bcee385c3f833b1c3=S00iQ54BtD8DcQVeU8lcRtY2EtaHVyIVDCNE2YmljbFaUpxY'
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
