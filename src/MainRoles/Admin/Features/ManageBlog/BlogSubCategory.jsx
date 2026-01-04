import { useEffect, useState } from "react";
import BlogTagTable from "./BlogTagTable";
import { blogSubCategoryListApi, getBlogTagsApi } from "@/ApiRoutes/AdminApi";
import AddTagsModal from "./AddTagsModal";
import AddSubCategoryModal from "./AddSubCategoryModal";
import BlogSubCategoryTable from "./BlogSubCategoryTable";

const BlogSubCategory = () => {
  const [search, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [editData, setEditData] = useState(null);
  const [subCategoryData , setSubCategoryData] = useState([])

  function getEditData(data) {
    setEditData(data);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

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

  useEffect(() => {
    getBlogSubCategories();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div className="row mb-3">
                <div className="col-6">
                  <h2 className="breadcrumb_title pb-3">Blog Sub Category</h2>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-end">
                    <button
                      className="btn-upgrade w-100-mobile"
                      type="button"
                      onClick={() => setOpen(true)}
                    >
                      Add Sub Category
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <BlogSubCategoryTable
                    query={search}
                    subCategoryData={subCategoryData}
                    loader={loader}
                    getEditData={getEditData}
                    getBlogSubCategories={getBlogSubCategories}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddSubCategoryModal
        open={open}
        handleClose={handleClose}
        editData={editData}
        getBlogSubCategories={getBlogSubCategories}
      />
    </>
  );
};

export default BlogSubCategory;
