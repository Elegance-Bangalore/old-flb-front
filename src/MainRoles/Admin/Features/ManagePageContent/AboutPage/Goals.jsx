import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { AddSquare, Edit2, MinusSquare, Trash } from "iconsax-react";
import ShowError from "@/CustomCommon/Others/ShowError";

function Goals({ Formik }) {

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    setValues,
  } = Formik

  const uploadImage = (e, i) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      const newValues = [...values.mission];
      newValues[i].icon = data.result;
      setFieldValue(`mission`, newValues);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  function onAddClick() {
    setValues({
      ...values,
      mission: [
        ...values.mission,
        {
          heading: "",
          description: "",
          icon: "",
        },
      ],
    });
  }

  function minusClick(index) {
    const list = [...values.mission];
    list.splice(index, 1);
    setValues({
      ...values,
      mission: list,
    });
  }

  function handleMissionChange(e, index) {
    const { name, value } = e.target;
    const newValues = [...values.mission];
    newValues[index][name] = value;
    setFieldValue(`mission`, newValues);
  }

  return (
    <>
      {
        values?.mission?.map((item, index) => (
          <div className="row" key={index}>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-6 ">
                  <FormControl className="mb-4">
                    <TextField
                      id="outlined-basic"
                      label="Heading"
                      variant="outlined"
                      name="heading"
                      value={item.heading}
                      onChange={(e) => handleMissionChange(e, index)}
                      onBlur={(e) => {
                        setFieldTouched(
                          values?.mission[index]?.heading,
                          true
                        );
                      }}

                    />
                    {errors?.mission?.length && touched?.mission?.length && touched?.mission?.[index]?.heading && <p className="text-danger">{errors?.mission[index]?.heading}</p>}
                  </FormControl>
                </div>
                <div className="col-md-6 ">
                  <FormControl className="mb-4">
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleMissionChange(e, index)}

                    />
                    {errors?.mission?.length && touched?.mission?.length && touched?.mission?.[index]?.description && <p className="text-danger">{errors?.mission[index]?.description}</p>}
                  </FormControl>
                </div>
                <div className="col-md-6">
                  <FormControl className="mb-4">
                    <div className="file-upload">
                      <img
                        className="img-fluid uploaded-image"
                        alt="Icon"
                        src={item.icon}
                      />
                      <div className="upload-icon">
                        <label
                          htmlFor={`file-upload${index}`}
                          className="btn btn-profile-edit d-inline-block"
                        >
                          <Edit2 />
                        </label>

                        <span>
                          <button
                            onClick={() =>
                              setFieldValue("heroImage", "")
                            }
                            type="button"
                            className="btn btn-profile-delete d-inline-block"
                          >
                            <Trash />
                          </button>
                        </span>
                       
                      </div>
                     
                    </div>
                    {errors?.mission?.length && touched?.mission?.length && touched?.mission?.[index]?.icon && <p className="text-danger">{errors?.mission[index]?.icon}</p>}

                    <TextField
                      type="file"
                      id={`file-upload${index}`}
                      variant="outlined"
                      hidden
                      onChange={(e) => uploadImage(e, index)}
                      name="icon"
                      accept="image/*"
                    />
                  </FormControl>

                </div>
              </div>
            </div>
            <div className="col-md-2">
              <MinusSquare
                size="50"
                color="#f47373"
                hidden={index === 0}
                variant="Bulk"
                onClick={() => minusClick(index)}
                style={{ cursor: "pointer" }}
              />
              <AddSquare
                size="50"
                color="#37d67a"
                variant="Bulk"
                onClick={onAddClick}
                style={{ cursor: "pointer" }}
              />

            </div>
          </div>
        )

        )
      }
    </>
  )
}

export default Goals