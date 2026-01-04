import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { getMessageList, sendMessage, getChatList } from "./chatApi";
import { toast } from "react-toastify";

const initialState = {
  chatList: [],
  messageList: [],
  senderId: null,
  propertyId: null,
  loading: false,
  messageLoading: false,
  senderProfilePic: "",
  receiverProfilePic: "",
  propertyName: "",
  showModal: false,
  senderName: "",
};

export const getChatListAsync = createAsyncThunk(
  "chat/getChatList",
  async ({ search }) => {
    try {
      const response = await getChatList(search);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const sendMessageAsync = createAsyncThunk(
  "chat/sendMessage",
  async () => {
    try {
      const response = await sendMessage();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getMessageListAsync = createAsyncThunk(
  "chat/getMessageList",
  async ({ senderId, propertyId }) => {
    try {
      const response = await getMessageList(senderId, propertyId);
      return response.data;
    } catch (error) {
      toast.error("Unable to load messages for this user");
      throw error;
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPropertyId: (state, action) => {
      state.propertyId = action.payload;
    },
    setSenderId: (state, action) => {
      state.senderId = action.payload;
    },
    setMessageList: (state, action) => {
      state.messageList = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setSenderName: (state, action) => {
      state.senderName = action.payload;
    },
    setPropertyName: (state, action) => {
      state.propertyName = action.payload;
    },
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChatListAsync.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getChatListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload;
      })
      .addCase(getChatListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMessageListAsync.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(getMessageListAsync.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.messageList = action.payload.messages ?? action.payload;
        state.senderProfilePic = action.payload.senderProfile;
        state.receiverProfilePic = action.payload.receiverProfilePic;
      })
      .addCase(getMessageListAsync.rejected, (state, action) => {
        state.messageLoading = false;
        state.error = action.payload;
        state.messageList = [];
      });
  },
});

export const selectChatList = (state) => state.chat.chatList;
export const selectLoading = (state) => state.chat.loading;
export const selectMessageList = (state) => state.chat.messageList;
export const selectPropertyId = (state) => state.chat.propertyId;
export const selectSenderId = (state) => state.chat.senderId;
export const selectMessageLoading = (state) => state.chat.messageLoading;
export const selectShow = (state) => state.chat.showModal;
export const selectSenderPic = (state) => state.chat.senderProfilePic;
export const selectReceiverPic = (state) => state.chat.receiverProfilePic;
export const selectSenderName = (state) => state.chat.senderName;
export const selectPropertyName = (state) => state.chat.propertyName;

export const {
  setPropertyId,
  setSenderId,
  setMessageList,
  setChatList,
  setSenderName,
  setShowModal,
  setPropertyName,
} = chatSlice.actions;

export default chatSlice.reducer;
