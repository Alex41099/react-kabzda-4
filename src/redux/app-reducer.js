import {getAuthUserData} from "./auth-reducer";
import {getUserProfile, setEditModeProfile} from "./profile-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'; // AT


let initialState = {
    initialized: false, // Создаем своиство
    initializedProfile: false, // Создаем своиство
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})


export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData())

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }
}


export default appReducer;