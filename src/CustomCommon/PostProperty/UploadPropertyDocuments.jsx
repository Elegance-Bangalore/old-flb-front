import { documentTypeListApi } from "@/ApiRoutes/AdminApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShowError from "../Others/ShowError";
import { Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import GetFileUrl from "../AllRoles/GetFileUrl";

function UploadPropertyDocuments({ formik }) {
  const [documentTypesData, setDocumentTypesData] = useState([]);
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

  async function getDocumentType() {
    try {
      const response = await documentTypeListApi();
      setDocumentTypesData(response?.data?.documentsType);
    } catch (error) {
      toastMessage(400, "Failed to get Document Types");
    } finally {
    }
  }

  useEffect(() => {
    getDocumentType();
  }, []);

  return (
    <div className="row mb-5">
      <div className="col-xxl-12">
        <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
          <div className="row mb-3">
            <div className="col-12">
              <h4 className="">Upload Property Documents</h4>
            </div>
          </div>
          <div className="col-xxl-6">
            <FormControl fullWidth className="mb-4">
              <InputLabel id="document-type-label">Document Type</InputLabel>
              <Select
                labelId="document-type-label"
                label="Document Type"
                name="documentName"
                value={values.documentName}
                onChange={handleChange}
                onBlur={handleBlur}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value={""}>Select</MenuItem>
                {documentTypesData?.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              <ShowError
                touched={touched.documentName}
                message={errors.documentName}
              />
            </FormControl>
          </div>

          <div className="col-xxl-6 mb-3">
            <GetFileUrl inputName={"documentFile"} formik={formik} />
            <ShowError
                touched={touched.documentFile}
                message={errors.documentFile}
              />
          </div>
          <Link to={values?.documentFile?.Location}>
            {values?.documentFile?.key}{" "}
          </Link>
          <span
            className="ms-3"
            hidden={!values?.documentFile?.key}
            onClick={() => setFieldValue("documentFile", "")}
            style={{ cursor: "pointer" }}
          >
            <Trash />
          </span>
        </div>
      </div>
    </div>
  );
}

export default UploadPropertyDocuments;
