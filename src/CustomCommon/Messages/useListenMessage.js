import { useEffect, useState } from "react";
import {
  getMessageListAsync,
  selectMessageList,
  selectPropertyId,
  selectSenderId,
  setMessageList,
  setPropertyId,
  setPropertyName,
  setSenderId,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "@/Context/SocketContext";
import { toast, Slide } from "react-toastify";
import notification from "@/CustomAssets/Sounds/getMsg.mp3";
import { unReadCountApi } from "@/ApiRoutes/ChatApiRoutes";
import { getChatListAsync } from "@/Redux/Chat/chatSlice";
import { selectUser } from "@/Redux/Auth/authSlice";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const messageList = useSelector(selectMessageList);
  const senderId = useSelector(selectSenderId);
  const propertyId = useSelector(selectPropertyId);
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  async function readMessageCount(pId, sId) {
    await unReadCountApi(pId, sId);
  }

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notification);
      sound.play();
     
      toast(`${newMessage.senderName} :  ${newMessage.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "custom-toast",
        style: {
          backgroundColor: "black",
          color: "white",
          border: "1px solid white",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        },  
        transition: Slide,
        onClick: async () => {
          if(!user.subscription){
              toast.info("Please buy Subscription to continue chat")
              return
          }
          dispatch(setSenderId(newMessage.senderId));
          dispatch(setPropertyId(newMessage.propertyId));
          dispatch(setSenderName(newMessage.receiverName));
          dispatch(setPropertyName(newMessage.propertyName));
          dispatch(setShowModal(true));
          readMessageCount(newMessage.propertyId ,newMessage.senderId )
        },
      });
      if (
        senderId === newMessage.senderId &&
        propertyId === newMessage.propertyId
      ) {
        dispatch(setMessageList([...messageList, newMessage]));
      }
      dispatch(getChatListAsync({ search: "" }));
    });

    return () => socket?.off("newMessage");
  }, [socket, messageList]);
};
export default useListenMessages;
