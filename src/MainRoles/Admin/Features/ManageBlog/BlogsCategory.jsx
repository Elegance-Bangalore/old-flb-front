import {FormControl,TextField,} from "@mui/material";
import AdminSidebarMenu from "../../AdminLayouts/AdminSidebarMenu";
import Header from "@/components/common/header/dashboard/Header";
import BlogsCategoryTable from "./BlogCategoryTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdminMobileMenu from "../../AdminLayouts/AdminMobileMenu";

const BlogsCategory = () => {
  const [search, setSearchTerm] = useState("");
  return (
    <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">Blog Category</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div>
                <form className="row">
                  <div className="col-md-3">
                    <FormControl className="mb-4">
                      <TextField
                        id=""
                        label="Search by Name"
                        variant="outlined"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-9 col-12 mb-3">
                    <div className="text-end">
                      <Link to="/admin/addBlogCategory">
                        <button className="btn-upgrade w-100-mobile">
                          ADD CATEGORY
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-md-12">
                    <BlogsCategoryTable query={search} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default BlogsCategory;
