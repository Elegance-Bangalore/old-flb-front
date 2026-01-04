import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import {
  FormControl,
  Autocomplete,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useFormik } from "formik";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  blogSubCategoryListApi,
  editBlogApi,
  getBlogCategoryApi,
  getBlogTagsApi,
  uploadImageApi,
} from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import ShowError from "@/CustomCommon/Others/ShowError";
import AddTagsModal from "./AddTagsModal";
import { blogAddSchema } from "../../AdminSchema/adminSchema";
import { toastMessage } from "@/CustomServices/ToastMessage";
import TinyEditor from "@/CustomCommon/Others/TinyEditor";
import UploadFileButton from "@/CustomCommon/MaterialUi/UploadFileButton";
import ImageLableRectangle from "@/CustomCommon/AllRoles/ImageLableRectangle";
import { trendingVideos } from "@/CustomServices/Constant";

function EditBlogs() {
  const [loader, setLoader] = useState(false);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const location = useLocation();
  const { state } = location;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [tagsData, setTagsData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const initialValues = {
    category: state.categoryId?._id,
    title: state.title,
    tags: state.tags ? state.tags?.map((tag) => tag?._id) : [],
    logo: state.logo,
    selectDate: formatDate(state.selectDate),
    featured: state.featured,
    content: state.content,
    slug: state.slug || "",
    meta: state.meta || "",
    subCategory: state.subCategory || "",
    categoryName: state.categoryId?.category,
    youtubeLink: state.youtubeLink || "",
  };

  async function getBlogTags() {
    try {
      const response = await getBlogTagsApi();
      setTagsData(response?.data?.data);
    } catch (error) {
    } finally {
    }
  }

  async function getBlogSubCategories() {
    try {
      const response = await blogSubCategoryListApi();
      const data = response?.data?.data;
      setSubCategoryData(response?.data?.data);
      const findId = data.find(
        (category) => category?._id === values?.subCategory._id
      );
      if (findId) setSelectedSubCategory(findId);
    } catch (error) {
    } finally {
    }
  }

  async function EditBlog(value) {
    setLoader(true);
    try {
      const response = await editBlogApi(state.id, {
        ...value,
        tags: value.tags ? value.tags : [],
        categoryId: value.category,
      });
      navigate(-1);
      toast.success("Blog Updated Successfully");
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
      const data = response.data.data;
      setBlogCategoryData(data);
      const findId = data.find(
        (category) => category?._id === values?.category
      );
      if (findId) setSelectedCategory(findId);
    } catch (error) {
      toast.error("Something went wrong in Blog Category List");
    } finally {
      setLoader(false);
    }
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: blogAddSchema,

    onSubmit: (values) => {
      EditBlog(values);
    },
  });

  useEffect(() => {
    getBlogCategory();
    getBlogTags();
    getBlogSubCategories();
  }, []);

  useEffect(() => {
    setSelectedTags(state?.tags);
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_content">
                  <h2 className="breadcrumb_title pb-3">Edit Blogs</h2>
                </div>
              </div>
              <div className="col-md-4 mt-2 mb-4">
                <div>
                  <Autocomplete
                    id="autocomplete"
                    options={blogCategoryData}
                    value={selectedCategory ? selectedCategory : null}
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
                      setSelectedCategory(value);
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

              <div className="col-md-4 mt-2 ">
                <div className="mb-5">
                  <Autocomplete
                    id="autocomplete"
                    options={subCategoryData}
                    value={selectedSubCategory ? selectedSubCategory : null}
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
                    onChange={(event, value) => {
                      setFieldValue("subCategory", value ? value._id : "");
                      setSelectedSubCategory(value);
                    }}
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

              <div className="col-md-12 my-4">
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

              <div className="col-10 mb-4">
                <Autocomplete
                  multiple
                  id="tags"
                  className="w-100"
                  value={selectedTags ? selectedTags : []}
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
                    setSelectedTags(newTags);
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

              <div className="col-md-12 mb-4">
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

              <div className="col-12 mt-1 mb-2">
                {loader ? (
                  <div className="mt-2">
                    <OnClickLoader />
                  </div>
                ) : (
                  <div className="d-flex mt-1 mb-2">
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
          </div>
          <div className="col-lg-3"></div>
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

export default EditBlogs;
