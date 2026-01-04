import React, { useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import close from "@/public/assets/images/icons/close-circle.svg";

const UploadImage = ({ name = "default", values, setFieldValue }) => {
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
            readFileAsBase64(file)
                .then((data) => {
                    setFieldValue(name, data.base64String);
                })
                .catch((error) => {
                    console.error("Error reading file:", error);
                });
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
        if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
            readFileAsBase64(file)
                .then((data) => {
                    setFieldValue(name, data.base64String);
                })
                .catch((error) => {
                    console.error("Error reading file:", error);
                });
        } else {
            alert("Please upload a valid image file (jpg, jpeg, png).");
        }
    };

    return (
        <>
            <FormControl className="mb-4">
                <label htmlFor={name}>
                    <div
                        className={`file-upload border-dash d-flex justify-content-center align-items-end flex-row ${dragOver ? 'drag-over' : ''}`}
                        style={{ height: "6rem" }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="text-center">
                            <h4>Drop or Select Image</h4>
                            <h6 className="fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h6>
                            <p className="text-gray mb-0">Only 1 Image | Max. 10 MB | Formats: jpg, jpeg, png </p>
                        </div>
                    </div>
                </label>
                <TextField
                    type="file"
                    id={name}
                    variant="outlined"
                    hidden
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg"
                />
            </FormControl>
            {values[name] && (
                <div className="feature-preview-img-list-wrapper">
                    <div className="feature-preview-img-list d-flex justify-content-between mb-4">
                        <div className="feature-preview-img position-relative">
                            <button
                                className="btn p-0 border-0 position-absolute top-0 end-0"
                                onClick={() => setFieldValue(name, "")}
                            >
                               <img src={close} className="img-fluid" style={{ width: "3rem" }} />
                            </button>
                            <div className="properties-image">
                                <img src={values[name]} alt="preview" className="img-fluid rounded-3" style={{ height: "10rem", width: "100%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadImage;
