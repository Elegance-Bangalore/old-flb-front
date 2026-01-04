import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FormControl, TextField, Tooltip } from "@mui/material";
import { postGeneralEnquiryApi } from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";

const AddEnquirieModal = ({ show, rowData, handleClose, getEnquiryList }) => {
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);

  const sendMessage = async () => {
    try {
      setLoader(true);
      const response = await postGeneralEnquiryApi(rowData._id, {
        reply: answer,
      });
      getEnquiryList();
      handleClose();
      toastMessage(200, "Reply Successfully");
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
      setAnswer("");
    }
  };

  useEffect(() => {
    setAnswer(rowData.reply || "");
  }, [show]);

  return (
    <Modal
      className="custom-modal-sub"
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop="static"
    >
      <div className="custom-modal-header px-4 py-3" style={{ height: "auto" }}>
        <h4 className="fl-ff-main fl-text-white mb-0">Send Reply</h4>
      </div>
      <div className="custom-modal-content px-0 pb-4">
        <div className="mb-4 d-flex px-4 py-3 gap-3 border-bottom">
          <h5 className="fl-ff-main fl-text-dark">To</h5>{" "}
          <h5 className="fl-ff-main fl-text-dark fw-normal">{rowData.email}</h5>
        </div>
        <div className=" px-4">
          <div className="">
            <FormControl className="mb-4">
              <TextField
                id=""
                label="Message"
                variant="outlined"
                name=""
                multiline
                rows={3}
                value={rowData.message}
                readOnly
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              {/* <ShowError
                            touched={touched.question}
                            message={errors.question}
                        /> */}
            </FormControl>
          </div>
          <div className="">
            <FormControl className="mb-4">
              <TextField
                id=""
                label="Reply"
                variant="outlined"
                name=""
                disabled={rowData?.reply}
                multiline
                rows={3}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                // onBlur={handleBlur}
              />
              {/* <ShowError
                            touched={touched.question}
                            message={errors.question}
                        /> */}
            </FormControl>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3 px-4">
          <button
            className="modal-btn-dark text-uppercase fw-bold px-5"
            onClick={handleClose}
          >
            CANCEL
          </button>
          <Tooltip
            title={`${rowData?.reply ? "Already Replied" : ""}`}
            placement="top"
          >
            <button
              type="button"
              className="modal-btn-green text-uppercase fw-bold"
              disabled={!answer || loader || rowData?.reply}
              onClick={() => sendMessage()}
            >
              {loader ? "Sending.." : "Send"}
            </button>
          </Tooltip>
        </div>
      </div>
    </Modal>
  );
};

export default AddEnquirieModal;
