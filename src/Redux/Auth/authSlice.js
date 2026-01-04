import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, subAdminProfile, userProfile } from "./authApi";
import { removeCookie } from "@/CustomServices/GetCookies";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isUserLoggedIn: false,
  subscription: false,
  previousUrl: "",
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userProfileAsync = createAsyncThunk(
  "user/userProfile",
  async () => {
    try {
      const response = await userProfile();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const subAdminProfileAsync = createAsyncThunk(
  "user/subAdminProfile",
  async () => {
    try {
      const response = await subAdminProfile();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.isUserLoggedIn = true;
    },
    setStatus: (state) => {
      state.isUserLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isUserLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    setPreviousUrl: (state, action) => {
      state.previousUrl = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload.status === 200 ? action.payload.data : null;
        state.isUserLoggedIn = action.payload.status === 200 ? true : false;
        state.loading = false;
      })
      .addCase(userProfileAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(subAdminProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(subAdminProfileAsync.fulfilled, (state, action) => {
        state.user =
          action.payload.status === 200 ? action.payload.response : null;
        state.isUserLoggedIn = action.payload.status === 200 ? true : false;
        state.loading = false;
      })
      .addCase(subAdminProfileAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectIsUserLoggedIn = (state) => state.auth.isUserLoggedIn;
export const selectSubscription = (state) => state.auth.subscription;
export const selectPreviousUrl = (state) => state.auth.previousUrl;
export const {
  setUser,
  setLogout,
  setLoading,
  setStatus,
  setSubscription,
  setPreviousUrl,
} = authSlice.actions;
export default authSlice.reducer;
