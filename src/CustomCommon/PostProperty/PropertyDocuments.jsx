import React, { useState } from "react";
import { FormControl } from "@mui/material";
import uploadDocument from "@/public/assets/images/profile/document-upload.png";
import { FaCross } from "react-icons/fa";
import { Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import ShowError from "../Others/ShowError";

function PropertyDocuments({ formik }) {
  const [maintenanceBillFile, setMaintenanceBillFile] = useState("");
  const [propertyPapersFiles, setPropertyPapersFiles] = useState([]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  const handleMaintenanceBillFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = {
          name: file.name,
          base64: reader.result,
        };
        setMaintenanceBillFile(fileData);
        setFieldValue("maintainanceBills", [fileData.base64]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePropertyPapersFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length + values.propertyPapers.length > 2) {
        alert("You can't upload more than two files for property papers.");
        return;
      }

      const fileList = Array.from(files);
      const base64Strings = [];

      fileList.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          base64Strings.push(reader.result);
          if (base64Strings.length === fileList.length) {
            // If all files have been read, update propertyPapers state
            setPropertyPapersFiles((prevFiles) => [
              ...prevFiles,
              ...base64Strings,
            ]);
            setFieldValue("propertyPapers", [
              ...values.propertyPapers,
              ...base64Strings,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    // Filter out files that are not image or PDF
    const filteredFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    // Check if any files were filtered out (i.e., unsupported file types)
    if (filteredFiles.length < files.length) {
      alert("Please upload only image (JPEG/PNG) or PDF files.");
    }

    // Proceed with handling the filtered files
    handleMaintenanceBillFileChange({ target: { files: filteredFiles } });
  };

  const handleDropproperty = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    // Filter out files that are not image or PDF
    const filteredFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    // Check if any files were filtered out (i.e., unsupported file types)
    if (filteredFiles.length < files.length) {
      alert("Please upload only image (JPEG/PNG) or PDF files.");
    }

    // Proceed with handling the filtered files
    handlePropertyPapersFileChange({ target: { files: filteredFiles } });
  };

  const deleteDoc = (index) => {
    const papers = [...values.propertyPapers];
    papers.splice(index, 1);
    setFieldValue("propertyPapers", papers);
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-xxl-3">
          <h3>Verify Your Property</h3>
        </div>
        <div className="col-xxl-9">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <h4 className="mb-3">Select Preferred mode of Verification</h4>
            <ul
              className="nav nav-pills mb-3 property-nav-tab-list border mb-5"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-maintenance-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-maintenance"
                  type="button"
                  role="tab"
                  aria-controls="pills-maintenance"
                  aria-selected="true"
                >
                  Property Maintenance Bill
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-papers-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-papers"
                  type="button"
                  role="tab"
                  aria-controls="pills-papers"
                  aria-selected="false"
                >
                  Property Papers{" "}
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-maintenance"
                role="tabpanel"
                aria-labelledby="pills-maintenance-tab"
              >
                <div className="">
                  <FormControl className="mb-4">
                    <label htmlFor="maintainance">
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="file-upload border-dash d-flex justify-content-center align-items-end flex-row"
                        style={{ height: "20rem" }}
                      >
                        <div className="text-center">
                          <img
                            className="img-fluid mb-3 post-upload-image"
                            src={uploadDocument}
                            alt="Document"
                          />
                          <h3>Drop your documents here</h3>
                          <h4 className="mb-5 fw-semi-bold">
                            Drop here or click{" "}
                            <span className="text-green fw-bold">browse</span>{" "}
                            to select
                          </h4>
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="maintainance"
                      variant="outlined"
                      hidden
                      accept=".pdf,image/*"
                      onChange={handleMaintenanceBillFileChange}
                    />
                  </FormControl>
                </div>
                {values.maintainanceBills[0] && (
                  <div className="d-flex gap-3">
                    <a
                      className="fw-bold"
                      href={values.maintainanceBills[0]}
                      target="_blank"
                    >
                      Maintenance Bill Document
                    </a>
                    <Trash
                      size="25"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFieldValue("maintainanceBills", []);
                        setMaintenanceBillFile("");
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="pills-papers"
                role="tabpanel"
                aria-labelledby="pills-papers-tab"
              >
                <div className="">
                  <FormControl className="mb-4">
                    <label htmlFor="propertyPaper">
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDropproperty}
                        className="file-upload border-dash d-flex justify-content-center align-items-end flex-row"
                        style={{ height: "20rem" }}
                      >
                        <div className="text-center">
                          <img
                            className="img-fluid mb-3 post-upload-image"
                            src={uploadDocument}
                            alt="Document"
                          />
                          <h3>Drop your documents here</h3>
                          <h4 className="mb-5 fw-semi-bold">
                            Drop here or click{" "}
                            <span className="text-green fw-bold">browse</span>{" "}
                            to select
                          </h4>
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="propertyPaper"
                      variant="outlined"
                      hidden
                      accept=".pdf,image/*"
                      onChange={handlePropertyPapersFileChange}
                      multiple
                    />
                  </FormControl>
                </div>
                <div className="d-flex gap-3">
                  {values?.propertyPapers?.map((base64String, index) => (
                    <div
                      className="d-flex gap-2 justify-content-center align-items-center"
                      key={index}
                    >
                      <a
                        className="fw-bold"
                        href={base64String}
                        target="_blank"
                      >{`Paper ${index + 1}`}</a>
                      <Trash
                        size="20"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteDoc(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ShowError
              touched={touched.maintainanceBills}
              message={errors.maintainanceBills}
            />
            {/* <ShowError touched={touched.propertyPapers} message={errors.propertyPapers} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDocuments;
