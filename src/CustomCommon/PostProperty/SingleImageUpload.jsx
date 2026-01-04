// import React, { useState } from "react";
// import { FormControl, TextField } from "@mui/material";
// import upload from "@/public/assets/images/profile/upload.png";
// import close from "@/public/assets/images/icons/close-circle.svg";

// function SingleImageUpload({
//   formik,
//   name,
//   show = true,
//   height = "20rem",
//   details = "Only 1 Image | Formats: jpg, jpeg, png",
// }) {

//   console.log("upload single image......................................................")
//   const { values, setFieldValue } = formik;
//   const [dragOver, setDragOver] = useState(false);

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve({
//           name: file.name,
//           base64String: reader.result,
//         });
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (
//       file &&
//       (file.type === "image/jpeg" ||
//         file.type === "image/png" ||
//         file.type === "image/jpg")
//     ) {
//       readFileAsBase64(file)
//         .then((data) => {
//           setFieldValue(name, data.base64String);
//         })
//         .catch((error) => {
//           console.error("Error reading file:", error);
//         });
//     } else {
//       alert("Please upload a valid image file (jpg, jpeg, png).");
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setDragOver(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragOver(false);
//     const file = event.dataTransfer.files[0];
//     if (
//       file &&
//       (file.type === "image/jpeg" ||
//         file.type === "image/png" ||
//         file.type === "image/jpg")
//     ) {
//       readFileAsBase64(file)
//         .then((data) => {
//           setFieldValue(name, data.base64String);
//         })
//         .catch((error) => {
//           console.error("Error reading file:", error);
//         });
//     } else {
//       alert("Please upload a valid image file (jpg, jpeg, png).");
//     }
//   };

//   return (
//     <div>
//       <div className="px-4 mt-4">
//         <FormControl className="mb-4">
//           <label htmlFor={name}>
//             <div
//               className={`file-upload border-dash d-flex justify-content-center align-items-end flex-row ${
//                 dragOver ? "drag-over" : ""
//               }`}
//               style={{ height: height }}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             >
//               <div className="text-center">
//                 {show && (
//                   <>
//                     <img
//                       className="img-fluid mb-3 post-upload-image"
//                       src={upload}
//                       alt="upload"
//                     />
//                     <h3>Drop or Select Image</h3>
//                   </>
//                 )}
//                 <h4 className="mb-5 fw-semi-bold">
//                  {details}
//                 </h4>
//               </div>
//             </div>
//           </label>
//           <TextField
//             type="file"
//             id={name}
//             variant="outlined"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             accept="image/png, image/jpeg, image/jpg"
//           />
//         </FormControl>
//         <div className="feature-preview-img-list-wrapper">
//           {values[name] && (
//             <div className="feature-preview-img-list d-flex justify-content-between mb-4">
//               <div className="feature-preview-img position-relative">
//                 <button
//                   className="btn p-0 border-0 position-absolute top-0 end-0"
//                   onClick={() => setFieldValue(name, "")}
//                 >
//                   <img
//                     src={close}
//                     className="img-fluid"
//                     style={{ width: "3rem" }}
//                   />
//                 </button>
//                 <div className="properties-image">
//                   <img
//                     src={values[name]}
//                     alt="property-img"
//                     className="img-fluid aspect-1-1 rounded-3"
//                     style={{ width: "10rem" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default SingleImageUpload;


import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import upload from "@/public/assets/images/profile/upload.png";
import close from "@/public/assets/images/icons/close-circle.svg";

function SingleImageUpload({
  formik,
  name,
  show = true,
  height = "20rem",
  details = "Only 1 Image | Formats: jpg, jpeg, png",
}) {
  console.log("upload image frontend")
  const { values, setFieldValue } = formik;
  const [dragOver, setDragOver] = useState(false);
  const user = useSelector(selectUser);

  // Check if user is admin
  const isAdmin = user?.interested === "admin" || user?.role === "admin";

  // ✅ Add watermark using Canvas (only for non-admin users)
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

          // Draw original image
          ctx.drawImage(img, 0, 0);

          // Add watermark text
          const watermarkText = "farmlandbazaar.com";
          ctx.font = "24px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.textAlign = "center";
          ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 30);

          // Convert canvas back to base64
          const base64String = canvas.toDataURL(file.type || "image/png");
          resolve(base64String);
        };

        img.onerror = () => reject(new Error("Image load error"));
      };

      reader.onerror = () => reject(new Error("FileReader error"));
      reader.readAsDataURL(file);
    });
  };

  // ✅ Handle file upload with conditional watermarking
  const handleFileUpload = async (file) => {
    try {
      if (isAdmin) {
        // For admin users, convert to base64 without watermark
        const reader = new FileReader();
        reader.onload = (e) => {
          setFieldValue(name, e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        // For non-admin users, add watermark
        const watermarkedBase64 = await addWatermark(file);
        setFieldValue(name, watermarkedBase64);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      handleFileUpload(file);
    } else {
      alert("Please upload a valid image file (jpg, jpeg, png).");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      handleFileUpload(file);
    } else {
      alert("Please upload a valid image file (jpg, jpeg, png).");
    }
  };

  return (
    <div>
      <div className="px-4 mt-4">
        <FormControl className="mb-4">
          <label htmlFor={name}>
            <div
              className={`file-upload border-dash d-flex justify-content-center align-items-end flex-row ${
                dragOver ? "drag-over" : ""
              }`}
              style={{ height: height }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                {show && (
                  <>
                    <img
                      className="img-fluid mb-3 post-upload-image"
                      src={upload}
                      alt="upload"
                    />
                    <h3>Drop or Select Image</h3>
                  </>
                )}
                <h4 className="mb-5 fw-semi-bold">{details}</h4>
              </div>
            </div>
          </label>
          <TextField
            type="file"
            id={name}
            variant="outlined"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </FormControl>
        <div className="feature-preview-img-list-wrapper">
          {values[name] && (
            <div className="feature-preview-img-list d-flex justify-content-between mb-4">
              <div className="feature-preview-img position-relative">
                <button
                  className="btn p-0 border-0 position-absolute top-0 end-0"
                  onClick={() => setFieldValue(name, "")}
                >
                  <img
                    src={close}
                    className="img-fluid"
                    style={{ width: "3rem" }}
                  />
                </button>
                <div className="properties-image">
                  <img
                    src={values[name]}
                    alt="property-img"
                    className="img-fluid aspect-1-1 rounded-3"
                    style={{ width: "10rem" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleImageUpload;
