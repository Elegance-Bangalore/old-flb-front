import { useEffect } from "react";
import {
  getMessageListAsync,
  selectMessageList,
  setMessageList,
  setPropertyId,
  setSenderId,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "@/Context/SocketContext";
import { toast, Slide } from "react-toastify";
import notification from "@/CustomAssets/Sounds/Noti.mp3";
import { unReadCountApi } from "@/ApiRoutes/ChatApiRoutes";

const chatListUpdate = () => {
  const { socket } = useSocketContext();
  const messageList = useSelector(selectMessageList);


  useEffect(() => {
    socket?.on("updatedChatList", (result) => {
      //   result.shouldShake = true;
    });
    return () => socket?.off("updatedChatList");
  }, [socket, messageList]);
};
export default chatListUpdate;
