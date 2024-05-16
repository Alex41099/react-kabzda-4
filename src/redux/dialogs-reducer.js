const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
}

const DialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody; // 2. сюда вместо локального store'а передаем наш параметр из action'а!
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}], // 3. и сюда она передастся!
            }
        default:
            return state;
    }
}


export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody}) //1. Приходит наш newMessageBody


export default DialogsReducer;
