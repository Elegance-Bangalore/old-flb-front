import { configureStore } from "@reduxjs/toolkit";
import propertiesSlice from "../features/properties/propertiesSlice";
import authSlice from "@/Redux/Auth/authSlice";
import propertySlice from "@/Redux/Property/propertySlice";
import chatSlice from "@/Redux/Chat/chatSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesSlice,
    auth: authSlice,
    property: propertySlice,
    chat: chatSlice,
  },
});
