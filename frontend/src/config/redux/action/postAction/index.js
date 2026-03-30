import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get(`/posts`);

            console.log("API RESPONSE 👉", response.data);
            return response.data;
        } catch (error) {
            console.log("FULL ERROR 👉", error);

            return thunkAPI.rejectWithValue(
                error.response?.data || error.message || "Something went wrong"
            );
        }
    }
);