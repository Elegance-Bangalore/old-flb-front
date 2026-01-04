import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import ShowError from "../Others/ShowError";
import { Edit, Trash } from "iconsax-react";

// Helper to get initials from company name
function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

// Helper to get a random color based on name
function getRandomColor(name) {
  const colors = ["#FFB6C1", "#FFD700", "#87CEFA", "#32CD32", "#FFA07A", "#9370DB", "#00B8D9", "#FF5630", "#36B37E", "#6554C0"];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ImageLableRectangle({inputName , setFieldValue , values , touched , errors}) {

    const [dragOver, setDragOver] = useState(false);


    const uploadImage = (e) => {
        const data = new FileReader();
        data.addEventListener("load", () => {
          setFieldValue(e.target.name, data.result);
        });
        data.readAsDataURL(e.target.files[0]);
      };
    
      const handleDeleteImage = (name) => {
        setFieldValue(name, "");
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
      };
    
      const handleDragEnter = () => {
        setDragOver(true);
      };
    
      const handleDragLeave = () => {
        setDragOver(false);
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        const data = new FileReader();
        data.addEventListener("load", () => {
          setFieldValue([inputName], data.result);
        });
        data.readAsDataURL(file);
      };


  return (
    <>
      <FormControl className="mb-4">
        <div
          className={`file-upload ${dragOver ? "drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{height:"148px" , width:"180px"}}
        >
          {values[inputName] ? (
            <img
              className="img-fluid uploaded-image"
              src={values[inputName]}
              alt="image"
              style={{objectFit:"fill"}}
            />
          ) : values.companyName ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: getRandomColor(values.companyName),
                color: "#fff",
                fontWeight: "bold",
                fontSize: "2.5rem",
                borderRadius: "1rem",
                letterSpacing: 2,
                textTransform: "uppercase"
              }}
            >
              {getInitials(values.companyName)}
            </div>
          ) : (
            <div className="upload-placeholder">
              Upload Company {inputName}
            </div>
          )}
          <div className="upload-icon">
            <label
              htmlFor="file-upload"
              className="btn btn-profile-edit d-inline-block"
            >
              <Edit />
            </label>
            {values[inputName] && (
              <button
                onClick={() => handleDeleteImage(inputName)}
                type="button"
                className="btn btn-profile-delete d-inline-block"
              >
                <Trash />
              </button>
            )}
          </div>
        </div>
        
        <ShowError touched={touched[inputName]} message={errors[inputName]} />

        <TextField
          type="file"
          id="file-upload"
          variant="outlined"
          hidden
          onChange={(e) => uploadImage(e)}
          name={inputName}
          accept="image/*" // Add this line to accept only image files
        />
      </FormControl>
    </>
  );
}
