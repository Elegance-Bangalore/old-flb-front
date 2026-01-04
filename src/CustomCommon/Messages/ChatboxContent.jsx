import { getMessagesApi, sendMessageApi, unReadCountApi } from "@/ApiRoutes/ChatApiRoutes";
import SignleChatboxReply from "./SignleChatboxReply";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaHourglassEnd } from "react-icons/fa";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  TextField,
  InputLabel,
  MenuItem,
  InputAdornment,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMessageListAsync, selectChatList, selectMessageList, selectPropertyId, selectPropertyName, selectSenderId, selectSenderName, setChatList, setMessageList } from "@/Redux/Chat/chatSlice";

import building from "@/public/assets/images/icons/building.svg"
import { toast } from "react-toastify";
import notification from "@/CustomAssets/Sounds/sendMsg.mp3";



const ChatboxContent = ({ show,handleBackClick }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const senderId = useSelector(selectSenderId);
  const propertyId = useSelector(selectPropertyId);
  const messageList = useSelector(selectMessageList);
  const chatList = useSelector(selectChatList)
  const senderName = useSelector(selectSenderName);
  const propertyName = useSelector(selectPropertyName);
  const [loader, setLoader] = useState(false)


  async function sendMessage(event) {
    event.preventDefault()
    try {
      setLoader(true);
      const response = await sendMessageApi(
        senderId,
        propertyId,
        { message }
      );
      const sound = new Audio(notification);
      sound.play();
      dispatch(setMessageList([...messageList, response.data]));
      setMessage("")
      await unReadCountApi(propertyId, senderId)
      const updatedChatList = chatList?.map(user => {
        if (user.id === senderId && user.propertyId === propertyId) {
          return { ...user, unreadCount: 0 };
        }
        return user;
      });
      dispatch(setChatList(updatedChatList));

    } catch (error) {
      toast.error("Server Error in sending message! Try again");
    
      throw error
    }
    finally {
      setLoader(false); // Hide loader
    }
  }


  useEffect(() => {
    if (senderId && propertyId) {
      dispatch(getMessageListAsync({ senderId, propertyId }))
    }

  }, [show])

  return (
    <>
      <div className="chat-user-detail">
        <div className="user-detail d-flex justify-content-between align-items-center">
          <div className="user">
          {window.innerWidth <= 768 && (
            <a onClick={handleBackClick} className=""><KeyboardBackspaceIcon/></a>
          )}
            <div className="chat-image-wrapper">
              <Avatar sx={{ bgcolor: "#F4F6F8" , color: "#919EAB" , border: "1px solid #919EAB", width: "4rem", height: "4rem" }}>
              </Avatar>
            </div>
            <div className="meta-chat">
              <h5>{senderName}</h5>
            </div>
          </div>
        </div>
        <div className="chat-property-detail">
          <div className="">
            <span><img src={building} alt="icon" /></span> {propertyName} <span> </span>
          </div>
        </div>
      </div>
      <div className="inbox_chatting_box" style={{ minHeight: "390px" }}>
        <ul className="chatting_content">
          <SignleChatboxReply />
        </ul>
      </div>

      <form>
        <div className="mi_text">
          <div className="message_input">

            <div className="row">
              <div className="col-9 col-md-10">
                <TextField
                  label="Type a message" variant="standard"
                  name=""
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}

                />
              </div>
              <div className="col-3 col-md-2">
                <button className="pill-btn-green fs-3 w-100 h-100" onClick={(event) => sendMessage(event)} disabled={!message || loader}>  {loader ? <FaHourglassEnd /> : <IoMdSend />}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatboxContent;



