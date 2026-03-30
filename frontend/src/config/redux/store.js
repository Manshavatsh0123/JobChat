import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer
    }
})


/*
STEP FOR STATE MANAGEMENT
1.submit action
2.Handle action in it's reducer
3.Register Here -> Reducer
*/


