import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import api from "./api";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isInitialized: false,
  userData: null,
  error: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        userData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        loginData,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const authChecker = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/profile`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/profile`,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      isInitialized = false;
      state.userData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userData = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userData = null;
        state.error = action.payload;
      })

      //Login cases
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.userData = null;
        state.error = null;
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload?.success;
        state.userData = action.payload;
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userData = null;
        state.error = action.payload;
      })

      //Auth cases
      .addCase(authChecker.pending, (state) => {
        state.loading = true;
      })

      .addCase(authChecker.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.userData = action.payload.profile;
      })

      .addCase(authChecker.rejected, (state, action) => {
        state.loading = false;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.userData = null;
        state.error = action.payload;
      })

      //Logout cases
      .addCase(logOut.pending, (state) => {
        state.loading = true;
      })

      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isInitialized = false;
        state.userData = action.payload;
      })

      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userAuthSlice.reducer;
export const { clearAuthState } = userAuthSlice.actions;
