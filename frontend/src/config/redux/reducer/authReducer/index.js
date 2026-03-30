import { loginUser, registerUser } from "../../action/authAction";
const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    profileFetched: false,
    connections: [],
    connectionRequest: []
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        restart: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello";
        }
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Knocking the door.....";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "Login is successful";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.loggedIn = false;
                state.message = action.payload?.message || "Login failed";
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Registering you.....";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = false;
                state.message = "Registration is successful";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload?.message || "Registration failed";
            });
    }
});

export default authSlice.reducer;