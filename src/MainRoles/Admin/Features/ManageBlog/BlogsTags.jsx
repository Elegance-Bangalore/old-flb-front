import { useEffect, useState } from "react";
import BlogTagTable from "./BlogTagTable";
import { getBlogTagsApi } from "@/ApiRoutes/AdminApi";
import AddTagsModal from "./AddTagsModal";

const BlogsTags = () => {
  const [search, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [editData, setEditData] = useState(null);

  function getEditData(data) {
    setEditData(data);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  async function getBlogTags() {
    try {
      setLoader(true);
      const response = await getBlogTagsApi();
      setTagsData(response?.data?.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getBlogTags();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Blog Tags</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="text-end">
                    <button
                      className="btn-upgrade w-100-mobile"
                      type="button"
                      onClick={() => setOpen(true)}
                    >
                      Add Tags
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <BlogTagTable
                    query={search}
                    tagsData={tagsData}
                    loader={loader}
                    getEditData={getEditData}
                    getBlogTags={getBlogTags}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTagsModal
        open={open}
        handleClose={handleClose}
        editData={editData}
        getBlogTags={getBlogTags}
      />
    </>
  );
};

export default BlogsTags;
