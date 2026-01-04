import { useEffect, useState } from "react";
import ChatboxContent from "./ChatboxContent";
import InboxUser from "./InboxUser";
import { useDispatch, useSelector } from "react-redux";
import { getChatListAsync, selectMessageList, selectPropertyId, selectSenderId } from "@/Redux/Chat/chatSlice";

const ChatBox = () => {
  const dispatch = useDispatch()
  const messageList = useSelector(selectMessageList);
  const senderId = useSelector(selectSenderId)
  const propertyId = useSelector(selectPropertyId)
  const [search, setSearch] = useState("")
  const [timer, setTimer] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      dispatch(
        dispatch(getChatListAsync({ search }))
      );
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);


  }, [dispatch, search])

  const handleUserClick = () => {
    setShowChat(true);
  };

  const handleBackClick = () => {
    setShowChat(false);
  };

  return (
    <div>
      <div className="row">
        {(!showChat || window.innerWidth > 768) && (
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="message_container">
              <InboxUser search={search} setSearch={setSearch} onUserClick={handleUserClick} />
            </div>
          </div>
        )}

        {(showChat || window.innerWidth > 768) && (
          <div className="col-12 col-lg-7 col-xl-8">
            <div className="message_container">
              {senderId && propertyId && messageList && <ChatboxContent handleBackClick={handleBackClick} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
