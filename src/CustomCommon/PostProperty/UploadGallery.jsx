import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import upload from "@/public/assets/images/profile/upload.png";
import uploadVideo from "@/public/assets/images/profile/upload-video.png";
import close from "@/public/assets/images/icons/close-circle.svg";
import ShowError from "../Others/ShowError";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";

function UploadGallery({ formik }) {
  const [dragOverImage, setDragOverImage] = useState(false);
  const [dragOverVideo, setDragOverVideo] = useState(false);
  const [video, setVideo] = useState("");

  const { values, setFieldValue, handleChange, handleBlur, touched, errors } =
    formik;

  const user = useSelector(selectUser);
  const isAdmin = user?.interested === "admin" || user?.role === "admin";

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

  const addWatermark = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const watermarkText = "farmlandbazaar.com";
          ctx.font = "24px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.textAlign = "center";
          ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 30);

          const base64String = canvas.toDataURL(file.type || "image/png");
          resolve(base64String);
        };

        img.onerror = () => reject(new Error("Image load error"));
      };

      reader.onerror = () => reject(new Error("FileReader error"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];

    e.target.value = null;

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

    const totalImages = values.images.length + validFiles.length;
    if (totalImages > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    if (validFiles.length > 0) {
      Promise.all(
        validFiles.map((file) =>
          isAdmin
            ? readFileAsBase64(file).then((d) => d.base64String)
            : addWatermark(file)
        )
      )
        .then((filesArray) => {
          const allImages = [...values.images, ...filesArray];
          setFieldValue("images", allImages);
        })
        .catch((error) => {
          console.error("Error processing images:", error);
        });
    }
  };

  const videoUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.size > 20 * 1024 * 1024) {
      alert("The video size should not exceed 20MB.");
      return;
    }

    if (
      file &&
      (file.type === "video/mp4" ||
        file.type === "video/wmv" ||
        file.type === "video/avi")
    ) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setVideo(base64String);
        setFieldValue("videos", [base64String]);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const deleteImage = (index) => {
    const images = [...values.images];
    images.splice(index, 1);
    setFieldValue("images", images);
  };

  const handleDragOverImage = (event) => {
    event.preventDefault();
    setDragOverImage(true);
  };

  const handleDragLeaveImage = () => {
    setDragOverImage(false);
  };

  const handleDropImage = (event) => {
    event.preventDefault();
    setDragOverImage(false);
    const files = Array.from(event.dataTransfer.files);
    let validFiles = [];

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

    const totalImages = values.images.length + validFiles.length;
    if (totalImages > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    Promise.all(
      validFiles.map((file) =>
        isAdmin ? readFileAsBase64(file).then((d) => d.base64String) : addWatermark(file)
      )
    )
      .then((filesArray) => {
        const allImages = [...values.images, ...filesArray];
        setFieldValue("images", allImages);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };
  const handleDragOverVideo = (event) => {
    event.preventDefault();
    setDragOverVideo(true);
  };

  const handleDragLeaveVideo = () => {
    setDragOverVideo(false);
  };

  const handleDropVideo = (event) => {
    event.preventDefault();
    setDragOverVideo(false);
    const file = event.dataTransfer.files[0];

    if (file && file.size > 20 * 1024 * 1024) {
      alert("The video size should not exceed 20MB.");
      return;
    }

    if (
      file &&
      (file.type === "video/mp4" ||
        file.type === "video/wmv" ||
        file.type === "video/avi")
    ) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setVideo(base64String);
        setFieldValue("videos", [base64String]);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  return (
    <>
      <div className="row px-4 mt-4">
        <div className="col-md-6">
          <FormControl className="mb-4">
            <label htmlFor="gallery-file-upload">
              <div
                className={`file-upload border-dash d-flex justify-content-center align-items-end flex-row ${
                  dragOverImage ? "drag-over" : ""
                }`}
                style={{ height: "26.6rem" }}
                onDragOver={handleDragOverImage}
                onDragLeave={handleDragLeaveImage}
                onDrop={handleDropImage}
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
              id="gallery-file-upload"
              variant="outlined"
              name="images"
              hidden
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
          </FormControl>
        </div>
        <div className="col-md-6">
          <div>
            <FormControl className="">
              <TextField
                id=""
                label="Paste YouTube Video Embed Link"
                variant="outlined"
                name="videoUrl"
                value={values.videoUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError touched={touched.videoUrl} message={errors.videoUrl} />
            </FormControl>
          </div>
          <div className="text-center my-3">
            <h5 className="text-gray fw-semi-bold mb-0">Or</h5>
          </div>
          <div>
            <FormControl className="mb-4">
              <label htmlFor="videoUpload">
                <div
                  className={`file-upload border-dash d-flex justify-content-center align-items-end flex-row ${
                    dragOverVideo ? "drag-over" : ""
                  }`}
                  style={{ height: "20rem" }}
                  onDragOver={handleDragOverVideo}
                  onDragLeave={handleDragLeaveVideo}
                  onDrop={handleDropVideo}
                >
                  <div className="text-center">
                    <img
                      className="img-fluid mb-3 post-upload-image"
                      src={uploadVideo}
                      alt="video"
                    />
                    <h3>Drop or Select Video</h3>
                    <h4 className="mb-5 fw-semi-bold">
                      Drop here or click{" "}
                      <span className="text-green fw-bold">browse</span> to
                      select
                    </h4>
                    <p className="text-gray fs-16">
                      Only 1 Video | Max. 20 MB | Formats: mp4, wmv, avi{" "}
                    </p>
                  </div>
                </div>
              </label>
              <input
                type="file"
                id="videoUpload"
                variant="outlined"
                accept="video/mp4, video/wmv, video/avi"
                hidden
                onChange={videoUpload}
              />
            </FormControl>
          </div>
        </div>
        <div className="col-12">
          <div className="master-preview-img-list-wrapper">
            <div className="master-preview-img-list d-flex gap-3 mb-4">
              {values.images?.length
                ? values.images.map((image, index) => (
                    <div
                      className="master-preview-img position-relative"
                      key={index}
                    >
                      <button
                        className="btn p-0 border-0 position-absolute top-0 end-0"
                        onClick={() => deleteImage(index)}
                      >
                        <img
                          src={close}
                          className="img-fluid"
                          style={{ width: "3rem" }}
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
                  ))
                : ""}
              {values.videos.length ? (
                <video controls style={{ width: "150px", height: "150px" }}>
                  <source src={values.videos[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                ""
              )}
            </div>
            <div className="bottom-master-buttons text-end">
              <button
                className="btn btn-outline-black rounded-btn mx-3"
                onClick={() => setFieldValue("images", [])}
              >
                Clear Images
              </button>
              <button
                className="btn btn-outline-black rounded-btn mx-3"
                onClick={() => setFieldValue("videos", [])}
              >
                Delete Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadGallery;
