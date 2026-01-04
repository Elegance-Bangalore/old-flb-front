import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import BlogTable from "./BlogTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogCategoryApi } from "@/ApiRoutes/AdminApi";

const BlogManage = () => {
  const [search, setSearchTerm] = useState("");
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [category, setCategory] = useState("");

  async function getBlogCategory() {
    try {
      const response = await getBlogCategoryApi("");
      setBlogCategoryData(response.data.data);
    } catch (error) {
      toast.error("Something went wrong in Blog Category List");
    } finally {
    }
  }

  useEffect(() => {
    getBlogCategory();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Manage Blogs</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div>
              <form className="row">
                <div className="col-md-3">
                  <FormControl className="mb-4">
                    <TextField
                      id=""
                      label="Search by  Name"
                      variant="outlined"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </FormControl>
                </div>

                <div className="col-md-3">
                  <FormControl className="mb-4">
                    <InputLabel id="">Filter By Category</InputLabel>
                    <Select
                      label="Filter By Category"
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {blogCategoryData.map((item) => (
                        <MenuItem value={item.category}>{item.category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-end">
                    <Link to="/admin/addBlogs">
                      <button className="btn-upgrade w-100-mobile">ADD BLOG</button>
                    </Link>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-md-12">
                  <BlogTable query={search} category={category}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogManage;
