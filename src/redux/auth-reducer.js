import {authAPI, CaptchaUrlApi} from "../API/Dal";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA = 'auth/GET_CAPTCHA';
const ERROR = 'auth/ERROR';


let initialState = {
    id: null,
    login: null,
    email: null,
    isTrue: false,
    captcha: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case GET_CAPTCHA:
            return {
                ...state,
                captcha: action.captchaUrl
            }

        default:
            return state;
    }
}


export const setAuthUserData = (id, login, email, isTrue) => ({type: SET_USER_DATA, data: {id, login, email, isTrue}})
export const getCaptcha = (captchaUrl) => ({type: GET_CAPTCHA, captchaUrl})


export const getAuthUserData = () => (dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        });
}


export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(CaptchaUrlSuccess())
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка"
                dispatch(stopSubmit("login", {_error: message}))
            }
            else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка"
                dispatch(stopSubmit("login", {_error: message}))
            }
        }
    }
}


export const Logout = () => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const CaptchaUrlSuccess = () => {
    return async (dispatch) => {
        const response = await CaptchaUrlApi.captcha()
        dispatch(getCaptcha(response.data.url))
    }
}

export default AuthReducer;