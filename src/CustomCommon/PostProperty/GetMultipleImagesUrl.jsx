import React, { useState } from "react";
import { FormControl } from "@mui/material";
import upload from "@/public/assets/images/profile/upload.png";
import close from "@/public/assets/images/icons/close-circle.svg";
import axios from "axios";
import BackdropLoader from "../MaterialUi/BackdropLoader";

function GetMultipleImagesUrl({ formik, name }) {
  const { values, setFieldValue } = formik;
  const [loader , setLoader] = useState(false)
  const apiUrl = import.meta.env.VITE_BASE_API_URL + "/directory/uploadFiles";

  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = async (files) => {
    setLoader(true)
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response", response);
      return response.data; // Assuming the API returns an array of URLs
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload images. Please try again.");
      return [];
    }finally{
      setLoader(false)
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files).filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    );

    const totalImages = values[name].length + files.length;
    if (totalImages <= 5) {
      const uploadedUrls = await uploadFiles(files);
      console.log("Uploaded URLs:", uploadedUrls);
      const allImages = [...values[name], ...uploadedUrls];
      setFieldValue(name, allImages);
    } else {
      alert("You can only upload up to 6 images.");
    }
  };

  const deleteImage = (index) => {
    const images = [...values[name]];
    images.splice(index, 1);
    setFieldValue(name, images);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragOver(false);

    const files = Array.from(event.dataTransfer.files).filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    );

    if (files.length === 0) {
      alert("Please drop only JPEG or PNG image files.");
      return;
    }

    const totalImages = values[name].length + files.length;
    if (totalImages <= 6) {
      const uploadedUrls = await uploadFiles(files);
      const allImages = [...values[name], ...uploadedUrls];
      setFieldValue(name, allImages);
    } else {
      alert("You can only upload up to 5 images.");
    }
  };

  return (
    <>
      <div className="row px-4 mt-4">
        <div className="col-xxl-12">
          <FormControl className="mb-4">
            <label htmlFor={name}>
              <div
                className={`file-upload border-dash d-flex justify-content-center align-items-end flex-row ${
                  dragOver ? "drag-over" : ""
                }`}
                style={{ height: "20rem" }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <img
                    className="img-fluid mb-3 post-upload-image"
                    src={upload}
                    alt="upload"
                  />
                  <h3>Drop or Select Image</h3>
                  <h4 className="mb-5 fw-semi-bold">
                    Drop here or click{" "}
                    <span className="text-green fw-bold">browse</span> to select
                  </h4>
                  <p className="text-gray fs-16">
                    Max 6 Images | Formats: jpg, jpeg, png{" "}
                  </p>
                </div>
              </div>
            </label>
            <input
              type="file"
              multiple
              id={name}
              variant="outlined"
              name={name}
              hidden
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
          </FormControl>
        </div>

        <div className="col-12">
          <div className="master-preview-img-list-wrapper">
            <div className="master-preview-img-list d-flex gap-3 mb-4">
              {values[name]?.length
                ? values[name]?.map((url, index) => (
                    <div className="" key={index}>
                      <div className="master-preview-img position-relative">
                        <button className="btn p-0 border-0 position-absolute top-0 end-20">
                          <img
                            src={close}
                            className="img-fluid"
                            style={{ width: "3rem" }}
                            onClick={() => deleteImage(index)}
                          />
                        </button>
                        <div className="properties-image">
                          <img
                            src={url.Location}
                            alt="property-img"
                            className="img-fluid aspect-1-1 rounded-3"
                            style={{ width: "10rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <div className="bottom-master-buttons text-end">
              <button
                className="btn btn-outline-black rounded-btn mx-3"
                onClick={() => {
                  setFieldValue(name, []);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <BackdropLoader openBackdrop={loader}/>
    </>
  );
}

export default GetMultipleImagesUrl;
