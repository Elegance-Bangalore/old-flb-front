import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sellerPropertyList,
  allPropertyList,
  savedPropertyList,
  highlyRecommendedList,
  newlyAddedPropertyList,
  singlePropertyDetail,
  featuredPropertyBanner,
} from "./propertyApis";
import { toastMessage } from "@/CustomServices/ToastMessage";

const initialState = {
  sellerProperty: [],
  loading: false,
  error: null,
  singleProperty: null,
  buyerPropertyListing: [],
  buyerPropertyCount: 0,
  buyerListingLoading: false,
  savedProperty: [],
  highRecommendedProperty: [],
  newlyAddedProperty: [],
  savedPropertiesId: [],
  featuredBanners: [],
  bannerLoading: true,
  bannerError: false,
};

export const featuredPropertyBannerAsync = createAsyncThunk(
  "property/featuredPropertyBanner",
  async () => {
    try {
      const response = await featuredPropertyBanner();
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const sellerPropertyListAsync = createAsyncThunk(
  "property/sellerPropertyList",
  async ({ filters }) => {
    try {
      const response = await sellerPropertyList(filters);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const singlePropertyDetailAsync = createAsyncThunk(
  "property/singlePropertyDetail",
  async ({ propertyCode }, { dispatch }) => {
    try {
      const response = await singlePropertyDetail(propertyCode);
      const { status, message, data } = response.data;
      if (status === 200) {
        return data;
      }
      toastMessage(status, message, dispatch);
    } catch (error) {
      throw error;
    }
  }
);

export const allPropertyListAsync = createAsyncThunk(
  "property/allPropertyList",
  async ({ filters }) => {
    try {
      const response = await allPropertyList(filters);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const highlyRecommendedListAsync = createAsyncThunk(
  "property/highlyRecommendedListA",
  async () => {
    try {
      const response = await highlyRecommendedList();
      return response.data.res;
    } catch (error) {
      throw error;
    }
  }
);

export const newlyAddedPropertyListAsync = createAsyncThunk(
  "property/newlyAddedPropertyList",
  async () => {
    try {
      const response = await newlyAddedPropertyList();
      return response.data.res;
    } catch (error) {
      throw error;
    }
  }
);

export const savedPropertyListAsync = createAsyncThunk(
  "property/savedPropertyList",
  async ({ filters }) => {
    try {
      const response = await savedPropertyList(filters);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setSellerProperty: (state, action) => {
      state.sellerProperty = action.payload;
    },
    setSingleProperty: (state, action) => {
      state.singleProperty = action.payload;
    },
    setSavedPropertyId: (state, action) => {
      state.savedPropertiesId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sellerPropertyListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(sellerPropertyListAsync.fulfilled, (state, action) => {
        state.sellerProperty = action.payload;
        state.loading = false;
      })
      .addCase(sellerPropertyListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allPropertyListAsync.pending, (state) => {
        state.buyerListingLoading = true;
      })
      .addCase(allPropertyListAsync.fulfilled, (state, action) => {
        state.buyerPropertyListing = action.payload;
        state.buyerListingLoading = false;
      })
      .addCase(allPropertyListAsync.rejected, (state, action) => {
        state.buyerListingLoading = false;
        state.error = action.payload;
      })
      .addCase(savedPropertyListAsync.pending, (state) => {
        state.buyerListingLoading = true;
      })
      .addCase(savedPropertyListAsync.fulfilled, (state, action) => {
        state.savedProperty = action.payload.dataArray;
        const ids = action.payload?.dataArray.map(
          (item) => item.properties._id
        );
        state.savedPropertiesId = ids ? ids : [];
        state.buyerListingLoading = false;
      })
      .addCase(savedPropertyListAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.buyerListingLoading = false;
      })
      .addCase(newlyAddedPropertyListAsync.pending, (state) => {
        state.buyerListingLoading = true;
      })
      .addCase(newlyAddedPropertyListAsync.fulfilled, (state, action) => {
        state.newlyAddedProperty = action.payload;
        state.buyerListingLoading = false;
      })
      .addCase(newlyAddedPropertyListAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.buyerListingLoading = false;
      })
      .addCase(highlyRecommendedListAsync.pending, (state) => {
        state.buyerListingLoading = true;
      })
      .addCase(highlyRecommendedListAsync.fulfilled, (state, action) => {
        state.highRecommendedProperty = action.payload;
        state.buyerListingLoading = false;
      })
      .addCase(highlyRecommendedListAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.buyerListingLoading = false;
      })
      .addCase(singlePropertyDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(singlePropertyDetailAsync.fulfilled, (state, action) => {
        state.singleProperty = action.payload;
        state.loading = false;
      })
      .addCase(singlePropertyDetailAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(featuredPropertyBannerAsync.pending, (state) => {})
      .addCase(featuredPropertyBannerAsync.fulfilled, (state, action) => {
        state.featuredBanners = action.payload;
        state.bannerLoading = false;
      })
      .addCase(featuredPropertyBannerAsync.rejected, (state, action) => {
        state.error = true;
        state.bannerLoading = false;
      });
  },
});

export const selectSellerProperty = (state) => state.property.sellerProperty;
export const selectBuyerPropertyListing = (state) =>
  state.property.buyerPropertyListing;
export const selectSingleProperty = (state) => state.property.singleProperty;
export const selectLoading = (state) => state.property.loading;
export const selectBuyerListingLoading = (state) =>
  state.property.buyerListingLoading;
export const selectSavedProperties = (state) => state.property.savedProperty;
export const selectHighlyRecommendedProperty = (state) =>
  state.property.highRecommendedProperty;
export const selectNewlyAddedProperty = (state) =>
  state.property.newlyAddedProperty;

export const selectFeaturedBanner = (state) => state.property.featuredBanners;
export const selectBannerLoading = (state) => state.property.bannerLoading;
export const selectBannerError = (state) => state.property.bannerError;
export const selectSavedPropertyId = (state) =>
  state.property.savedPropertiesId;
export const { setSellerProperty, setSingleProperty, setSavedPropertyId } =
  propertySlice.actions;

export default propertySlice.reducer;
