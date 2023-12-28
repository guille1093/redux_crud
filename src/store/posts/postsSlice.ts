import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const POST_URL = "https://gq-pfs.pockethost.io/api/collections/posts/records";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await new Promise((resolve) => {
            setTimeout(async () => {
                const result = await axios.get(POST_URL);
                resolve(result);
            }, 3000); // 3-second timeout
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: "loading",
        error: null,
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action) => {
            const { id, caption, img } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);
            if (existingPost) {
                existingPost.caption = caption;
                existingPost.img = img;
            }
        },
        deletePost: (state, action) => {
            const { id } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);
            if (existingPost) {
                state.posts = state.posts.filter((post) => post.id !== id);
            }
        },
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
            });
    },
});

export default postsSlice.reducer;