import {getProfileAPI, ProfileAPI, UsersAPI} from "../API/Dal";
import profile from "../components/Profile/Profile";
import {stopSubmit} from "redux-form";
import {initializedSuccess, initializedSuccessProfileEdit} from "./app-reducer";
import {getAuthUserData} from "./auth-reducer";

const ADD_POST = 'profile/ADD-POST';
const UPDATE_NEW_POST_TEXT = "profile/UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SAVE_PHOTO = "profile/SAVE_PHOTO";
const EDIT_PROFILE = "profile/EDIT_PROFILE";
const DISABLED_EDIT = "profile/DISABLED_EDIT";
const LOADER_USER_PROFILE = "profile/LOADER_USER_PROFILE";


let initialState = {
    posts: [
        {id: 1, messages: "Первый комментарий", likesCount: '12'},
        {id: 2, messages: "Второй комментарий", likesCount: '11'},
    ],
    profile: null,
    status: "",
    isBool: false,
    disabledEdit: null,
    loaderUsersProfile: null,
    isFetching: false,
}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3, messages: action.newPostText, likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile, editProfileForm: true, isFetching: true}
        }
        case SET_STATUS: {
            return {...state, status: action.status,}
        }
        case SAVE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.PhotoFiles}}
        }
        case EDIT_PROFILE: {
            return {...state, isBool: action.isBool}
        }
        case DISABLED_EDIT: {
            return {...state, disabledEdit: action.disabledEdit}
        }
        case LOADER_USER_PROFILE: {
            return {...state, loaderUsersProfile: action.loaderBoolean}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoAC = (PhotoFiles) => ({type: SAVE_PHOTO, PhotoFiles})
export const editProfileAC = (isBool) => ({type: EDIT_PROFILE, isBool})
export const disabledEditAC = (disabledEdit) => ({type: DISABLED_EDIT, disabledEdit})
export const loaderUsersProfile = (loaderBoolean) => ({type: DISABLED_EDIT, loaderBoolean})


export default ProfileReducer;

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        dispatch(loaderUsersProfile(true))
        const response = await UsersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
        dispatch(loaderUsersProfile(false))
    }
}


export const getStatus = (userId) => {
    return async (dispatch) => {
        const response = await ProfileAPI.getProfileStatus(userId)
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        const response = await ProfileAPI.updateStatus(status)
        if (response.resultCode === 0)
            dispatch(setStatus(response.data));
    }
}

export const savePhotoSunck = (Photofiles) => {
    return async (dispatch) => {
        const response = await ProfileAPI.savePhoto(Photofiles)
        if (response.data.resultCode === 0)
            dispatch(savePhotoAC(response.data.data.photos));

    }
}

// export const saveProfile = (profile) => {
//     return async (dispatch, getState) => {
//         dispatch(disabledEditAC(true))
//         const userId = getState().auth.id
//         const response = await ProfileAPI.saveProfile(profile)
//         if (response.data.resultCode === 0) {
//             dispatch(editProfileAC(false));
//             dispatch(getUserProfile(userId));
//             dispatch(disabledEditAC(false))
//
//         } else {
//             dispatch(editProfileAC(true));
//             dispatch(disabledEditAC(true))
//             if (response.data.resultCode === 1) {
//                 let message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка"
//                 dispatch(stopSubmit("edit-profile", {_error: message}));
//                 dispatch(disabledEditAC(false))
//             }
//         }
//     }
// }

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        let promise = dispatch(disabledEditAC(true))
        let userId = getState().auth.id
        let response = await ProfileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
             let promise1 = dispatch(getUserProfile(userId));
            let promise2 = dispatch(disabledEditAC(false))

            Promise.all([promise, userId,  response, promise1, promise2])
                .then(() => {
                    dispatch(editProfileAC(false))
                })

        } else {
            if (response.data.resultCode === 1) {
                let promise1 = dispatch(disabledEditAC(true))
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка"
                let promise2 = dispatch(stopSubmit("edit-profile", {_error: message}));
                let promise3 = dispatch(disabledEditAC(false))

                Promise.all([promise1, message,  promise2, promise3])
                    .then(() => {
                        dispatch(editProfileAC(true))
                    })
            }
        }
    }
}


export const editProfile = (isBool) => {
    return async (dispatch) => {
        dispatch(editProfileAC(isBool));

    }
}