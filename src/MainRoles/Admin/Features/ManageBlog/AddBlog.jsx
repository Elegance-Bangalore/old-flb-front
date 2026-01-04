import React, { useEffect, useState } from "react";
import {
  FormControl,
  Autocomplete,
  TextField,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useNavigate } from "react-router-dom";
import {
  addBlogApi,
  blogSubCategoryListApi,
  getBlogCategoryApi,
  getBlogTagsApi,
} from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { blogAddSchema } from "../../AdminSchema/adminSchema";
import ShowError from "@/CustomCommon/Others/ShowError";
import AddTagsModal from "./AddTagsModal";
import TinyEditor from "@/CustomCommon/Others/TinyEditor";
import UploadFileButton from "@/CustomCommon/MaterialUi/UploadFileButton";
import ImageLableRectangle from "@/CustomCommon/AllRoles/ImageLableRectangle";
import { trendingVideos } from "@/CustomServices/Constant";

function AddBlogs() {
  const [loader, setLoader] = useState(false);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [subCategoryData, setSubCategoryData] = useState([]);

  const navigate = useNavigate();
  const initialValues = {
    category: "",
    title: "",
    tags: [],
    logo: "",
    selectDate: "",
    featured: false,
    status: "",
    content: "",
    slug: "",
    meta: "",
    subCategory: "",
    youtubeLink: "",
    categoryName: "",
  };

  async function getBlogTags() {
    try {
      const response = await getBlogTagsApi();
      setTagsData(response?.data?.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }

  async function getBlogSubCategories() {
    try {
      setLoader(true);
      const response = await blogSubCategoryListApi();
      setSubCategoryData(response?.data?.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }

  async function addBlog(value) {
    setLoader(true);
    try {
      const response = await addBlogApi(value.category, {
        ...value,
        subCategory: value.subCategory || null,
      });
      navigate(-1);
      toast.success("Blog Added Successfully");
    } catch (error) {
      toastMessage(error.response.status, error.response.data.error);
    } finally {
      setLoader(false);
    }
  }

  async function getBlogCategory() {
    setLoader(true);
    try {
      const response = await getBlogCategoryApi("");
      setBlogCategoryData(response.data.data);
    } catch (error) {
      toast.error("Something went wrong in Blog Category List");
    } finally {
      setLoader(false);
    }
  }

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: blogAddSchema,
    onSubmit: (values) => {
      addBlog(values);
    },
  });

  useEffect(() => {
    getBlogCategory();
    getBlogTags();
    getBlogSubCategories();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_content">
                  <h2 className="breadcrumb_title pb-3">Add Blogs</h2>
                </div>
              </div>
              <div className="col-md-4 mt-2 mb-4">
                <div className="mb-5">
                  <Autocomplete
                    id="autocomplete"
                    options={blogCategoryData}
                    key={blogCategoryData
                      .map((category) => category._id)
                      .join("-")}
                    getOptionLabel={(option) => option.category}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Category" />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={option._id}>
                        {option.category}
                      </li>
                    )}
                    onChange={(event, value) => {
                      setFieldValue("category", value ? value._id : "");
                      setFieldValue(
                        "categoryName",
                        value ? value.category : ""
                      );
                    }}
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.category}
                    message={errors.category}
                  />
                </div>

                <div className="my-4">
                  <FormControl className="">
                    <TextField
                      id="outlined-basic"
                      label="Select Date"
                      variant="outlined"
                      name="selectDate"
                      type="date"
                      value={values.selectDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                  <ShowError
                    touched={touched.selectDate}
                    message={errors.selectDate}
                  />
                </div>
              </div>

              <div className="col-md-4 mt-2 mb-4">
                <div className="mb-5">
                  <Autocomplete
                    id="autocomplete"
                    options={subCategoryData}
                    key={subCategoryData
                      .map((category) => category._id)
                      .join("-")}
                    getOptionLabel={(option) => option.subCategory}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Sub Category" />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={option._id}>
                        {option.subCategory}
                      </li>
                    )}
                    onChange={(event, value) =>
                      setFieldValue("subCategory", value ? value._id : "")
                    }
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.subCategory}
                    message={errors.subCategory}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <ImageLableRectangle
                  inputName={"logo"}
                  setFieldValue={setFieldValue}
                  values={values}
                  touched={touched}
                  errors={errors}
                />
              </div>

              <div className="col-md-12 mt-4">
                <FormControl className="">
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <ShowError touched={touched.title} message={errors.title} />
              </div>

              <div
                className="col-md-12 my-4"
                hidden={values.categoryName !== trendingVideos}
              >
                <FormControl className="">
                  <TextField
                    id="outlined-basic"
                    label="Youtube Link"
                    variant="outlined"
                    name="youtubeLink"
                    value={values.youtubeLink}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <ShowError
                  touched={touched.youtubeLink}
                  message={errors.youtubeLink}
                />
              </div>

              <div className="col-10 my-4">
                <Autocomplete
                  multiple
                  id="tags"
                  className="w-100"
                  options={tagsData}
                  getOptionLabel={(option) => option.tags}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option.tags}
                    </li>
                  )}
                  onChange={(event, newTags) => {
                    const tagIds = newTags.map((tag) => tag._id);
                    setFieldValue("tags", tagIds);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Tags"
                      variant="outlined"
                    />
                  )}
                  sx={{ width: "800px", marginBottom: "15px" }}
                />
              </div>

              <div className="col-2">
                <button
                  className="btn-black w-100 fs-22 py-3"
                  onClick={() => setOpen(true)}
                >
                  Add Tag
                </button>
              </div>

              <div className="col-md-6">
                <FormControl className="">
                  <TextField
                    id="outlined-basic"
                    label="Slug"
                    variant="outlined"
                    name="slug"
                    value={values.slug}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
              </div>

              <div className="col-md-6 mb-4">
                <div
                  className={`${
                    values?.featured
                      ? "bg-border-light-green"
                      : "bg-border-light-grey"
                  }  swtich-container mb-3`}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values?.featured}
                        onChange={(event) =>
                          setFieldValue("featured", !values?.featured)
                        }
                        name="featured"
                      />
                    }
                    label="Mark as Featured"
                    labelPlacement="start"
                  />
                </div>
              </div>

              <div className="col-md-12 mb-4">
                <FormControl className="">
                  <TextField
                    id="outlined-basic"
                    label="Meta Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="meta"
                    value={values.meta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-12 mb-4"
              >
                <TinyEditor
                  content={values.content}
                  setFieldValue={setFieldValue}
                  name="content"
                />
                <ShowError touched={touched.content} message={errors.content} />
              </div>

              <div className="col-12 text-end">
                <UploadFileButton />
              </div>

              {loader ? (
                <div className="mt-4">
                  <OnClickLoader />
                </div>
              ) : (
                <div className="col-12 mt-4">
                  <button
                    type="button"
                    className="btn-upgrade mx-3"
                    style={{ fontSize: "1rem" }}
                    onClick={() => {
                      setFieldValue("status", "draft");
                      handleSubmit();
                    }}
                  >
                    SAVE AS DRAFT
                  </button>

                  <button
                    type="button"
                    className="btn btn-black rounded-4 py-2 fw-bold px-4 text-uppercase"
                    style={{ fontSize: "1rem" }}
                    onClick={() => {
                      setFieldValue("status", "publish");
                      handleSubmit();
                    }}
                  >
                    PUBLISH
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <AddTagsModal
        open={open}
        handleClose={handleClose}
        getBlogTags={getBlogTags}
      />
    </>
  );
}

export default AddBlogs;
