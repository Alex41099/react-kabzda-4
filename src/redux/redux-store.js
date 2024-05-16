import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import { thunk as thunkMiddleware } from 'redux-thunk'
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";


let reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    app: appReducer,  // Вот!
    form: formReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));

window.store = store;

export default store;

