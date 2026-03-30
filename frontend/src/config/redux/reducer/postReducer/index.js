import { getAllPosts } from "../../action/postAction";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    posts: [],
    isError: false,
    postFetched: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    comments: [],
    postId: ""
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        restart: () => initialState,
        resetPostId: (state) => {
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL POSTS
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all posts ......";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload.posts;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export default postSlice.reducer;