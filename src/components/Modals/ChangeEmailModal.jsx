import { sendOtpApi, verifyOtpApi } from "@/ApiRoutes/AuthApi";
import { changeEmailApi } from "@/ApiRoutes/BuyersApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { userProfileAsync } from "@/Redux/Auth/authSlice";
import { TextField } from "@mui/material";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


function ChangeEmailModal({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  async function handleEmailChange() {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoader(true);
    try {
      await changeEmailApi({ email });
      await dispatch(userProfileAsync());
      handleClose();
      setLoader(false);
      setEmail("");
      toast.success("Email Changed Successfully! Verificaton Link sent to your email")

    } catch (error) {
      setLoader(false);
      toast.error("Something went wrong in change email")
      throw error;
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      style={show ? { backgroundColor: "rgba(0, 0, 0, 0.5)" } : {}}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Email Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row gap-3">
            <div className="col-12">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                size="small"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
              />
              <div className="text-center">
                {loader ? (
                  <OnClickLoader />
                ) : (
                  <button
                    className="btn btn-log w-100 btn-thm mt-3"
                    type="button"
                    onClick={handleEmailChange}
                  >
                    Change Email
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeEmailModal;
