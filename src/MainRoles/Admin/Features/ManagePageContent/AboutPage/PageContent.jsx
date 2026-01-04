import React, { useState, useRef } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import { Edit2, Trash } from "iconsax-react";
import JoditEditor from "jodit-react";
import CustomJoditEditor from "@/CustomCommon/Others/CustomJoditEditor";

function PageContent({ Formik }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleImageUpload = async (files) => {
    try {
      const response = await uploadImageApi(files[0]);
      return response.data.location;
    } catch (error) {
      return null;
    }
  };

  const uploadImage = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setFieldValue(e.target.name, data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = Formik;

  return (
    <div className="row">
      <div className="col-md-12 mb-4">

        <CustomJoditEditor content={values.content} setFieldValue={setFieldValue} name="content" />
        <ShowError touched={touched.content} message={errors.content} />
      </div>

      <div className="col-md-6">
        <FormControl className="mb-4">
          <div className="file-upload">
            <img
              className="img-fluid uploaded-image"
              alt="Image"
              src={values.logo}
            />
            <div className="upload-icon">
              <label
                htmlFor="logo"
                className="btn btn-profile-edit d-inline-block"
              >
                <Edit2 />
              </label>

              <span>
                <button
                  onClick={() => setFieldValue("logo", "")}
                  type="button"
                  className="btn btn-profile-delete d-inline-block"
                >
                  <Trash />
                </button>
              </span>
            </div>
          </div>

          <TextField
            type="file"
            id="logo"
            name="logo"
            variant="outlined"
            hidden
            onChange={(e) => uploadImage(e)}
            accept="image/*"
          />
        </FormControl>
      </div>
    </div>
  );
}

export default PageContent;
