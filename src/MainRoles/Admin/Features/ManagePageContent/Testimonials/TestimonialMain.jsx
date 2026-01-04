import { useEffect, useState } from "react";
import { getTestimonialApi } from "@/ApiRoutes/AdminApi";
import AddTestimonialModal from "./AddTestimonialModal";
import TestimonialTable from "./TestimonialTable";

const TestimonialMain = () => {
  const [search, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [testimonialData, setTestimonialData] = useState([]);
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

  async function getTestimonials() {
    try {
      setLoader(true);
      const response = await getTestimonialApi();
      console.log("Response", response);
      setTestimonialData(response?.data?.testimonials);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-md-6">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Testimonials</h2>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div className="text-end">
              <button
                className="btn-upgrade w-100-mobile"
                type="button"
                onClick={() => setOpen(true)}
              >
                Add Testimonial
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TestimonialTable
                query={search}
                testimonialData={testimonialData}
                loader={loader}
                getEditData={getEditData}
                getTestimonials={getTestimonials}
              />
            </div>
          </div>
        </div>
      </div>
      <AddTestimonialModal
        open={open}
        handleClose={handleClose}
        editData={editData}
        getTestimonials={getTestimonials}
      />
    </>
  );
};

export default TestimonialMain;
