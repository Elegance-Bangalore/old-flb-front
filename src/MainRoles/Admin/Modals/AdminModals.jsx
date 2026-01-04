import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import deleteImage from "../../../CustomAssets/Admin/modal-delete.svg";
import subscriptionImage from "../../../CustomAssets/Admin/subscribe.png";
import addRecordImage from "../../../CustomAssets/Admin/delete-gray.png";
import { FormControl, TextField } from "@mui/material";

// Delete Modal Component
const DeleteModal = ({ show, handleClose }) => {
  return (
    <Modal className="custom-modal" show={show} onHide={handleClose} centered>
      <div className="text-center mb-3">
        <h2 className="fl-ff-main fl-text-dark">Delete Record</h2>
      </div>
      <Modal.Body>
        <div className="text-center mb-4">
          <div className="mb-5">
            <img src={deleteImage} alt="delete-Image" />
          </div>
          <p className="fl-fs-18 fl-text-dark lh-base">
            Lorem ipsum dolor sit amet consectetur. Curabitur sit sagittis
            euismod sit pellentesque euismod sit pellentesque
          </p>
        </div>
      </Modal.Body>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="modal-btn-dark text-uppercase fw-bold"
          onClick={handleClose}
        >
          CANCEL
        </button>
        <button
          className="modal-btn-red text-uppercase fw-bold"
          onClick={handleClose}
        >
          DELETE
        </button>
      </div>
    </Modal>
  );
};

// Subscription Modal Component
const SubscriptionModal = ({ show, handleClose }) => {
  return (
    <Modal
      className="custom-modal-sub"
      show={show}
      onHide={handleClose}
      centered
    >
      <div className="custom-modal-header"></div>
      <div className="custom-modal-content">
        <div className="text-center mb-5">
          <div className="mb-3 custom-modal-img">
            <img
              className="img-fluid"
              src={subscriptionImage}
              alt="subscription-Image"
            />
          </div>
          <h2 className="fl-ff-main fl-text-dark">Get a Subscription!</h2>
          <p className="fl-fs-18 fl-text-dark lh-base">
            Lorem ipsum dolor sit amet consectetur. Curabitur sit sagittis
            euismod sit pellentesque euismod sit pellentesque
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="w-100 modal-btn-dark text-uppercase fw-bold"
            onClick={handleClose}
          >
            CANCEL
          </button>
          <button
            className="w-100 modal-btn-green text-uppercase fw-bold"
            onClick={handleClose}
          >
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Add Record Modal Component
const AddRecordModal = ({ show, handleClose }) => {
  return (
    <Modal
      className="custom-modal-sub"
      show={show}
      onHide={handleClose}
      centered
    >
      <div className="custom-modal-header"></div>
      <div className="custom-modal-content">
        <div className="text-center mb-5">
          <div className="mb-3 custom-modal-img">
            <img
              className="img-fluid"
              src={addRecordImage}
              alt="subscription-Image"
            />
          </div>
          <h2 className="fl-ff-main fl-text-dark">Delete Property!</h2>
          <p className="fl-fs-18 fl-text-dark lh-base">
            Lorem ipsum dolor sit amet consectetur. Curabitur sit sagittis
            euismod sit pellentesque euismod sit pellentesque
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="w-100 modal-btn-dark text-uppercase fw-bold"
            onClick={handleClose}
          >
            CANCEL
          </button>
          <button
            className="w-100 modal-btn-red text-uppercase fw-bold"
            onClick={handleClose}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Add Record Modal Component
const AddEnquirieModal = ({ show, handleClose }) => {
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
          <h5 className="fl-ff-main fl-text-dark fw-normal">
            jaxsonkstanton@abcde.com
          </h5>
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
                // value={values.question}
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
                multiline
                rows={3}
                // value={values.question}
                // onChange={handleChange}
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
          <button
            className="modal-btn-green text-uppercase fw-bold"
            onClick={handleClose}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

// AdminModals Component
const AdminModals = () => {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [subscriptionModalShow, setSubscriptionModalShow] = useState(false);
  const [addRecordModalShow, setAddRecordModalShow] = useState(false);
  const [addEnquirieModalShow, setAddEnquirieModalShow] = useState(false);

  const handleClose = (modal) => {
    switch (modal) {
      case "delete":
        setDeleteModalShow(false);
        break;
      case "subscription":
        setSubscriptionModalShow(false);
        break;
      case "addRecord":
        setAddRecordModalShow(false);
        break;
      case "enquirie":
        setAddEnquirieModalShow(false);
        break;
      default:
        break;
    }
  };

  const handleShow = (modal) => {
    switch (modal) {
      case "delete":
        setDeleteModalShow(true);
        break;
      case "subscription":
        setSubscriptionModalShow(true);
        break;
      case "addRecord":
        setAddRecordModalShow(true);
        break;
      case "enquirie":
        setAddEnquirieModalShow(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="modal-btn-red text-uppercase fw-bold"
        onClick={() => handleShow("delete")}
      >
        Delete Modal
      </button>

      {/* Button to open subscription modal */}
      <button
        className="modal-btn-green text-uppercase fw-bold"
        onClick={() => handleShow("subscription")}
      >
        Subscription Modal
      </button>

      {/* Button to open add record modal */}
      <button
        className="modal-btn-dark text-uppercase fw-bold"
        onClick={() => handleShow("addRecord")}
      >
        Add Record Modal
      </button>

      <button
        className="modal-btn-dark text-uppercase fw-bold"
        onClick={() => handleShow("enquirie")}
      >
        Enquirie
      </button>

      {/* Delete Modal */}
      <DeleteModal
        show={deleteModalShow}
        handleClose={() => handleClose("delete")}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        show={subscriptionModalShow}
        handleClose={() => handleClose("subscription")}
      />

      {/* Add Record Modal */}
      <AddRecordModal
        show={addRecordModalShow}
        handleClose={() => handleClose("addRecord")}
      />

      <AddEnquirieModal
        show={addEnquirieModalShow}
        handleClose={() => handleClose("enquirie")}
      />
    </>
  );
};

export default AdminModals;
