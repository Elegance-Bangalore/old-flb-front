import { getChatListApi, unReadCountApi } from "@/ApiRoutes/ChatApiRoutes";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectChatList, selectPropertyId, selectPropertyName, selectSenderId, setChatList, setPropertyId, setPropertyName, setSenderId, setSenderName } from "@/Redux/Chat/chatSlice";
import { useSocketContext } from "@/Context/SocketContext";
import Badge from '@mui/material/Badge';
import { toast } from "react-toastify";
import { calculateRelativeTime } from "@/CustomServices/Constant";

const SingleUser = ({ onUserClick }) => {

  const chatList = useSelector(selectChatList);
  const propertyId = useSelector(selectPropertyId)
  const senderId = useSelector(selectSenderId);
  const dispatch = useDispatch()

  const { onlineUsers } = useSocketContext();

  function isOnline(id) {
    return onlineUsers ? onlineUsers.includes(id) : false;
  }


  async function getMessages(senderId, propertyId, senderName, propertyName) {
    dispatch(setSenderId(senderId))
    dispatch(setPropertyId(propertyId))
    dispatch(setSenderName(senderName))
    dispatch(setPropertyName(propertyName))
    onUserClick();

    try {
      const response = await unReadCountApi(propertyId, senderId)
      const updatedChatList = chatList?.map(user => {
        if (user.id === senderId && user.propertyId === propertyId) {
          return { ...user, unreadCount: 0 };
        }
        return user;
      });
      dispatch(setChatList(updatedChatList));
    }
    catch (error) {
      toast.error("Internal server error in load chat for this user")
    }
  }


  return (
    <>
      {chatList?.map((user, index) => (
        <li className={`contact chat-list ${senderId === user.id && propertyId === user.propertyId ? 'chat-match ' : ''}`} key={index} onClick={() => getMessages(user.id, user.propertyId, user.senderName, user.propertyName)}>
          <div className="wrap d-flex gap-3">
            <div className="chat-image-wrapper">
              <span className={`contact-status ${user.status} ${isOnline(user.id) ? "bg-success" : "bg-danger"} `}></span>

              {user.profilePic ? (
                <img
                  className="img-fluid"
                  src={user.profilePic}
                  alt="s1.jpg"
                  width={50}
                  height={50}
                />
              ) : (
                <Avatar sx={{ bgcolor: "#F4F6F8",
                color: "#919EAB",
                border: "1px solid #919EAB", width: "4rem", height: "4rem" }}>
                  {user.name?.slice(0, 1)}
                </Avatar>
              )}
            </div>
            <div className="meta">
              <h5 className="name">{user.senderName}</h5>
              <h6 className="name">Property Name : {user.propertyName}</h6>
              <h6 className="mt-2">{calculateRelativeTime(user.recentlyReceivedMessage)}</h6>
              <div className="text-danger">
                {user.unreadCount ? `${user.unreadCount} new messages` : ""}
              </div>
            </div>
          </div>


        </li>
      ))}
    </>
  );
};



export default SingleUser;
