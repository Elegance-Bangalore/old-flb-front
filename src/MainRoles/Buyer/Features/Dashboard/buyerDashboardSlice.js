import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastMessage } from "@/CustomServices/ToastMessage";
import {
  fetchSavedPropertyList,
  saveProperty,
  fetchAllPropertyList,
} from "./buyerDashboardApi";

const initialState = {
  savedPropertyList: [],
  newlyAddedPropertyList: [],
  highlyRecommendedPropertyList: [],
  allPropertyList: [],
  loading: false,
  error: null,
};

export const fetchSavedPropertiesAsync = createAsyncThunk(
  "buyerDashboard/fetchSavedPropertyList",
  async (_, { dispatch }) => {
    try {
      const response = await fetchSavedPropertyList();
      return response.data.res;
    } catch (error) {
      const { status, data } = error.response;
      toastMessage(status, data.error, dispatch);
      throw error;
    }
  }
);

export const savePropertyAsync = createAsyncThunk(
  "buyerDashboard/saveProperty",
  async (properties, { dispatch }) => {
    try {
      const response = await saveProperty(properties);
    } catch (error) {
      const { status, data } = error.response;
      toastMessage(status, data.message, dispatch);
      throw error;
    }
  }
);

export const fetchAllPropertyListAsync = createAsyncThunk(
  "buyerDashboard/fetchAllPropertyList",
  async ({ keyword, propertyType, page, status }, { dispatch }) => {
    try {
      const response = await fetchAllPropertyList(
        keyword,
        propertyType,
        page,
        status
      );
      return response;
    } catch (error) {
      const { status, data } = error.response;
      toastMessage(status, data.message, dispatch);
      throw error;
    }
  }
);

export const buyerDashboard = createSlice({
  name: "buyerDashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedPropertiesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedPropertiesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.savedPropertyList = action.payload;
      })
      .addCase(fetchSavedPropertiesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPropertyListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPropertyListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPropertyList = action.payload;
      })
      .addCase(fetchAllPropertyListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectSavedPropertyList = (state) =>
  state.buyerDashboard.savedPropertyList;
export default buyerDashboard.reducer;
