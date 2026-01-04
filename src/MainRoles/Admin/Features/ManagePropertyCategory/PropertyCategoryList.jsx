import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AddCategoryModal from "./AddCategoryModal";
import PropertyCategoryTable from "./PropertyCategoryTable";
import { propertyCategoryListApi } from "@/ApiRoutes/AdminApi";

function PropertyCategoryList() {

  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); setEditData(null) };
  const [editData, setEditData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getCategoryList() {
    try {
      setLoader(true)
      const response = await propertyCategoryListApi();
      setCategoryList(response?.data?.response)
    } catch (error) {
      throw error
    } finally {
      setLoader(false)
    }
  }

  function editCategory(show, data) {
    setOpen(show);
    setEditData(data)
  }

  useEffect(() => {
    getCategoryList()
  }, [])


  return (
    <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">Property Categories</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="text-end mb-4">
                  <button className="btn-upgrade w-100-mobile" type="button" onClick={() => setOpen(true)}>Add Category</button>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <PropertyCategoryTable editCategory={editCategory} loader={loader} data={categoryList} getCategoryList={getCategoryList} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <AddCategoryModal open={open} handleClose={handleClose} editData={editData} getCategoryList={getCategoryList} />
    </>
  );
}

export default PropertyCategoryList