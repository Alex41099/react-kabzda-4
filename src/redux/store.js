import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import SidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, messages: "Первый комментарий", likesCount: '12'},
                {id: 2, messages: "Второй комментарий", likesCount: '11'},
            ],
            newPostText: 'it-kamasutra',

        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Dinyich"},
                {id: 2, name: "Andrey"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sacha"},
                {id: 5, name: "Alexey"}
            ],

            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"},
            ],
            newMessagesBody: "asd",
        },
    },

    getState() {
      return this._state
    },

    _rerenderEntireTree() {
        console.log('hello');
    },

    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },

    // addPost() {
    //     let newPost = {
    //         id: 3, messages: this._state.profilePage.newPostText, likesCount: '0'
    //     }
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._rerenderEntireTree(this._state);
    // },
    //
    // updateNewPostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._rerenderEntireTree(this._state);
    // },

    dispatch(action) {
        this._state.profilePage = ProfileReducer(this._state.profilePage, action);
        this._state.messagesPage = DialogsReducer(this._state.messagesPage, action);
        // SidebarReducer(this._state, action)
        this._rerenderEntireTree(this._state);

        // if(action.type === ADD_POST) {
        //     let newPost = {
        //         id: 3, messages: this._state.profilePage.newPostText, likesCount: '0'
        //     }
        //     this._state.profilePage.posts.push(newPost);
        //     this._state.profilePage.newPostText = '';
        //     this._rerenderEntireTree(this._state);
        // }
        // else if(action.type === UPDATE_NEW_POST_TEXT) {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._rerenderEntireTree(this._state);
        // }
        // if(action.type === SEND_MESSAGE) {
        //     let body = this._state.messagesPage.newMessagesBody;
        //     this._state.messagesPage.messages.push({id: 6, messages: body});
        //     this._state.messagesPage.newPostText = '';
        //     this._rerenderEntireTree(this._state);
        // }
        // else if(action.type === UPDATE_NEW_MESSAGE_BODY) {
        //     this._state.messagesPage.newMessagesBody = action.body;
        //     this._rerenderEntireTree(this._state);
        // }
    }

}

// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
//
// const SEND_MESSAGE = "SEND-MESSAGE";
// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
//
//
// export const addPostActionCreator = () => ({type: ADD_POST})
//
// export const updateNewPostTextActionCreator = (text) => {
//     return {
//         type: UPDATE_NEW_POST_TEXT, newText: text,
//     }
// }
//
//
// export const sendMessageCreator = () => ({type: SEND_MESSAGE})
//
// export const updateNewMessageBodyCreator = (body) => {
//     return {
//         type: UPDATE_NEW_MESSAGE_BODY, body: body,
//     }
// }

window.store = store;
export default store;
