import {
  getChatListApi,
  getMessagesApi,
  sendMessageApi,
} from "@/ApiRoutes/ChatApiRoutes";

export async function getChatList(search) {
  try {
    const response = getChatListApi(search);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getMessageList(senderId, propertyId) {
  try {
    const response = getMessagesApi(senderId, propertyId);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendMessage(id) {
  try {
    const response = sendMessageApi(id);
    return response;
  } catch (error) {
    throw error;
  }
}
