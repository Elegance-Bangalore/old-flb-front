import { changePhoneNumberApi } from "@/ApiRoutes/BuyersApi";
import { sendOtpApi, verifyOtpApi } from "@/ApiRoutes/AuthApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { userProfileAsync } from "@/Redux/Auth/authSlice";
import { TextField } from "@mui/material";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

function ChangeNumberModal({ show, handleClose }) {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otpCounter, setOtpCounter] = useState(0);
  const [sendOtpLoader, setSendOtpLoader] = useState(false);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);
  const [phone, setPhone] = useState("");
  const [registerFormLoader, setRegisterFormLoader] = useState(false);
  const dispatch = useDispatch();

  async function sendOtp() {
    try {
      setSendOtpLoader(true);
      const response = await sendOtpApi({ phone, is_login: false });
      const { status, message } = response?.data;
      if (status === 200) {
        setOtpSent(true);
        setOtpCounter(60);
      }
      toastMessage(status, message);
    } catch (error) {
      toast.error("Something went wrong in sending OTP");
      throw error;
    } finally {
      setSendOtpLoader(false);
    }
  }

  async function submitOtp() {
    try {
      setVerifyOtpLoader(true);
      const otpData = {
        otp,
        phone,
        is_login: false,
      };
      const response = await verifyOtpApi(otpData);
      const { status, message } = response?.data;
      if (status === 200) {
        setVerifyOtp(true);
        const changeNumber = await changePhoneNumberApi({ phone });
        dispatch(userProfileAsync());
        handleClose();
        setPhone("");
        setOtp("");
      }
      toastMessage(status, message);
    } catch (error) {
      if (error) {
        toast.error("Something went wrong");
        throw error;
      }
    } finally {
      setVerifyOtpLoader(false);
    }
  }

  function phoneNoChange(value) {
    if (/^\d*\.?\d*$/.test(value)) {
      setPhone(value);
    }
    setOtpSent(false);
    setVerifyOtp(false);
    setOtp("");
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gap-3">
            <div className={otpSent ? "col-12" : "col-7"}>
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                inputProps={{ maxLength: 10 }}
                name="phone"
                value={phone}
                onChange={(e) => phoneNoChange(e.target.value)}
              />
            </div>
            <div className="col-4" hidden={otpSent}>
              {sendOtpLoader ? (
                <OnClickLoader />
              ) : (
                <button
                  className="btn btn-log w-100 btn-thm m-0"
                  type="button"
                  disabled={phone.length !== 10}
                  onClick={sendOtp}
                >
                  Send OTP 
                </button>
              )}
            </div>
            <div className="col-7" hidden={!otpSent}>
              <TextField
                id="otp"
                label="OTP"
                variant="outlined"
                inputProps={{ maxLength: 6 }}
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="col-4" hidden={!otpSent}>
              {verifyOtpLoader  ? (
                <OnClickLoader />
              ) : (
                <button
                  className="btn btn-log w-100 btn-thm m-0"
                  type="button"
                  disabled={otp.length !== 6}
                  onClick={submitOtp}
                >
                  Verify OTP
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeNumberModal;
