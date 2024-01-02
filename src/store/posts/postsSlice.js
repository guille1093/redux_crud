import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const POST_URL = "https://gq-pfs.pockethost.io/api/collections/posts/records";



export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(`${POST_URL}?sort=-created`);
    return response.data.items;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
    const newPost = initialPost.post;
    const response = await axios.post(POST_URL, newPost, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: "loading",
        error: null,
    },
    reducers: {
        addNewPostToState: (state, action) => {
            state.push({ ...action.payload });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
                state.status = "succeeded";
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default postsSlice.reducer;
export const { addNewPostToState } = postsSlice.actions;