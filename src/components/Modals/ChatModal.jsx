import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { MdShower } from "react-icons/md";
import {
  selectSenderName,
  selectShow,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import ChatboxContent from "@/CustomCommon/Messages/ChatboxContent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChatModal() {
  const show = useSelector(selectShow);
  const dispatch = useDispatch();
  const name = useSelector(selectSenderName);

  return (
    <>
      <React.Fragment>
        <div className="chat-dailog">
          <Dialog
            open={show}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(setShowModal(false))}
            aria-describedby="alert-dialog-slide-description"
            // hideBackdrop={true}
            fullWidth
            maxWidth="sm"
            disableScrollLock
          >
            {/* <DialogTitle>{name}</DialogTitle> */}
            <DialogContent className="chat-modal-top-wrapper">
              <div id="alert-dialog-slide-description">
                <div className="message_container">
                  <ChatboxContent show={show} />
                </div>
              </div>
            </DialogContent>

            <DialogActions className="chat-modal-bottom-wrapper">
              <Button
                className="chat-modal-btn"
                onClick={() => dispatch(setShowModal(false))}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </React.Fragment>
    </>
  );
}

export default ChatModal;
