
import { calculateRelativeTime, formatDate } from "@/CustomServices/Constant";
import { selectLoading, selectUser } from "@/Redux/Auth/authSlice";
import { getMessageListAsync, selectMessageList, selectMessageLoading, selectPropertyId, selectReceiverPic, selectSenderId, selectSenderPic } from "@/Redux/Chat/chatSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import ChatSkeleton from "@/CustomCommon/MaterialUi/ChatSkeleton";

const SignleChatboxReply = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const messageList = useSelector(selectMessageList);
  const senderId = useSelector(selectSenderId);
  const propertyId = useSelector(selectPropertyId);
  const senderPic = useSelector(selectSenderPic);
  const receiverPic = useSelector(selectReceiverPic);
  const loading = useSelector(selectMessageLoading)


  useEffect(() => {
    if (senderId && propertyId) {
      dispatch(getMessageListAsync({ senderId, propertyId }))
    }
  }, [dispatch, senderId, propertyId])



  return (
    <>
      {loading ? (
        <div className="text-center">
          <ChatSkeleton />
        </div>

      ) : (
        <>
          {
            messageList?.length ? (
              messageList?.map((message, index) => (
                user?._id !== message.receiverId ? (
                  <li className="" key={index}>
                    <div className="">

                      <div className={`sender-message d-flex gap-3`}>

                        <div className="msg">

                          <h5 style={{ fontSize: "18px" }} className="text-end">{message.message}</h5>
                          <div className="m-0 text-end" style={{ fontSize: "10px" }}>{calculateRelativeTime(message.createdAt)}</div>
                        </div>
                        <Avatar alt="" src={senderPic} />
                      </div>
                    </div>
                  </li>
                ) : (

                  <li className="" key={index}>
                    <div className="">

                      <div className={`receiver-message d-flex gap-3`}>
                        <Avatar alt="" src={receiverPic} />
                        <div className="msg">

                          <h5 style={{ fontSize: "18px" }}>{message.message}</h5>
                          <div className="m-0" style={{ fontSize: "10px" }}>{calculateRelativeTime(message.createdAt)}</div>
                        </div>

                      </div>
                    </div>
                  </li>
                )
              ))

            ) : (

              <div className="d-flex justify-content-center align-items-center">
                <h4>Start Conversation 👋</h4>
              </div>
            )
          }
        </>
      )}
    </>
  );
};

export default SignleChatboxReply;
