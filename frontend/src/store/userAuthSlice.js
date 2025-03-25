import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helper";

const initialState = {
  loading: false,
  success: false,
  data: null,
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
  async (data, { rejectWithValue }) => {
    const { email, password } = data;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken))

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/profile`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.data = action.payload.profile;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default userAuthSlice.reducer;
