import React, { useState } from "react";
import { FormControl } from "@mui/material";
import upload from "@/public/assets/images/profile/upload.png";
import close from "@/public/assets/images/icons/close-circle.svg";

function UploadMultipleImages({ formik, name }) {
  const { values, setFieldValue } = formik;

  const [dragOver, setDragOver] = useState(false);

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          name: file.name,
          base64String: reader.result,
        });
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];

    // Reset the input after validation
    e.target.value = null;

    // Validate each file
    files.forEach((file) => {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} exceeds the 5MB size limit.`);
        } else {
          validFiles.push(file);
        }
      } else {
        alert(`${file.name} is not a valid image file.`);
      }
    });

    const totalImages = values[name].length + validFiles.length;
    if (totalImages > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    if (validFiles.length > 0) {
      Promise.all(validFiles.map((file) => readFileAsBase64(file)))
        .then((filesArray) => {
          const attachmentArraybase64 = filesArray.map(
            (element) => element.base64String
          );
          const allImages = [...values[name], ...attachmentArraybase64];
          setFieldValue(name, allImages);
        })
        .catch((error) => {
          console.error("Error processing images:", error);
        });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const files = Array.from(event.dataTransfer.files);
    let validFiles = [];

    // Validate each file
    files.forEach((file) => {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} exceeds the 5MB size limit.`);
        } else {
          validFiles.push(file);
        }
      } else {
        alert(`${file.name} is not a valid image file.`);
      }
    });

    const totalImages = values[name].length + validFiles.length;
    if (totalImages > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    if (validFiles.length > 0) {
      Promise.all(validFiles.map((file) => readFileAsBase64(file)))
        .then((filesArray) => {
          const attachmentArraybase64 = filesArray.map(
            (element) => element.base64String
          );
          const allImages = [...values[name], ...attachmentArraybase64];
          setFieldValue(name, allImages);
        })
        .catch((error) => {
          console.error("Error processing images:", error);
        });
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
                    Max 6 Images | Formats: jpg, jpeg, png | Dimension : Minimum
                    1280*372 pixels | Size: Maximum 5 MB per image.
                  </h4>
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
            <div className="master-preview-img-list row mb-4">
              {values[name]?.length
                ? values[name]?.map((image, index) => (
                    <div className="col-2" key={index}>
                      <div className="master-preview-img position-relative">
                        <button className="btn p-0 border-0 position-absolute position-absolute top-0 end-20">
                          <img
                            src={close}
                            className="img-fluid"
                            style={{ width: "3rem" }}
                            onClick={() => deleteImage(index)}
                          />
                        </button>
                        <div className="properties-image">
                          <img
                            src={image}
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
    </>
  );
}

export default UploadMultipleImages;
