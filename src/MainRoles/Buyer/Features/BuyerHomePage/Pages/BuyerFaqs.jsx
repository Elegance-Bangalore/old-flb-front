import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import BuyerFooter from "../Layouts/BuyerFooter";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useFormik } from "formik";

import { buyerFaqListApi, generalInquiryApi } from "@/ApiRoutes/BuyersApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import ShowError from "@/CustomCommon/Others/ShowError";
import { toast } from "react-toastify";
import { generalEnquiryValidations } from "@/Schemas/PostPropertySchema";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import FaqTabs from "../Components/FaqTabs";

const BuyerFaqs = () => {
  const [value, setValue] = useState("seller");
  const [faqLoader, setFaqLoader] = useState(false);

  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("seller");
  const [faqData, setFaqData] = useState([]);
  const [timer, setTimer] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: "",
    pageSize: "",
  });
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  async function getFaqList() {
    try {
      setLoader(true);
      const data = { query, category, ...paginationModel };
      const response = await buyerFaqListApi(data);
      setFaqData(response?.data?.res);
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  const Formik = useFormik({
    initialValues,
    validationSchema: generalEnquiryValidations,
    onSubmit: (values) => {
      generalEnquiry(values);
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    setValues,
    handleSubmit,
    resetForm,
    touched,
  } = Formik;

  function generalEnquiry(values) {
    setFaqLoader(true);
    generalInquiryApi(values)
      .then((res) => {
        setFaqLoader(false);
        toast.success("Your query has been submitted successfully.");
        resetForm();
      })
      .catch((error) => {
        console.error("Error submitting query:", error);
        setFaqLoader(false);
        toast.error(
          "An error occurred while submitting your query. Please try again later."
        );
      });
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getFaqList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [query, category, paginationModel]);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-heading-banner">
          <div className="container fl-container">
            <h1 className="fl-banner-heading fl-text-dark-green">FAQs</h1>
            <p className="fl-banner-heading-normal fl-text-dark-green fw-semi-bold">
              Frequently Asked Questions
            </p>
          </div>
        </section>
        <section>
          <div className="container fl-container fl-mt-n-6">
            <div className="row pt-2 mb-5">
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    className="form-control rounded-4 py-3 fl-fs-18"
                    type="text"
                    name=""
                    id=""
                    placeholder="Search your queries here"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9 mb-4">
                <div className="fl-card-shadow">
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChanges}
                        aria-label="lab API tabs example"
                        sx={{ paddingTop: ".6rem" }}
                      >
                        <Tab
                          className="mx-3"
                          sx={{
                            fontSize: "1.1rem",
                            textTransform: "capitalize",
                          }}
                          label="Search"
                          value="search"
                          hidden={!query}
                        />
                        <Tab
                          className="mx-3"
                          sx={{
                            fontSize: "1.1rem",
                            textTransform: "capitalize",
                          }}
                          label="Seller"
                          value="seller"
                          onClick={() => setCategory("seller")}
                          hidden={query}
                        />
                        <Tab
                          className="mx-3"
                          sx={{
                            fontSize: "1.1rem",
                            textTransform: "capitalize",
                          }}
                          label="General"
                          value="general"
                          onClick={() => setCategory("general")}
                          hidden={query}
                        />
                        <Tab
                          className="mx-3"
                          sx={{
                            fontSize: "1.1rem",
                            textTransform: "capitalize",
                          }}
                          label="Account"
                          value="account"
                          onClick={() => setCategory("account")}
                          hidden={query}
                        />
                        <Tab
                          className="mx-3"
                          sx={{
                            fontSize: "1.1rem",
                            textTransform: "capitalize",
                          }}
                          label="Buyer"
                          value="buyer"
                          onClick={() => setCategory("buyer")}
                          hidden={query}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="search">
                      <FaqTabs faqData={faqData} />
                    </TabPanel>
                    <TabPanel value="general">
                      <FaqTabs faqData={faqData} />
                    </TabPanel>
                    <TabPanel value="account">
                      <FaqTabs faqData={faqData} />
                    </TabPanel>
                    <TabPanel value="buyer">
                      <FaqTabs faqData={faqData} />
                    </TabPanel>
                    <TabPanel value="seller">
                      <FaqTabs faqData={faqData} />
                    </TabPanel>
                  </TabContext>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border fl-card-border border-raidus-10 mb-5">
                  <div className="px-4 py-3 fl-bg-light-dark mb-3">
                    <h4 className="fl-text-dark text-uppercase mb-0 fl-fs-22">
                      Need more help?
                    </h4>
                  </div>
                  <div className="p-3">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Full Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ShowError
                          touched={touched.name}
                          message={errors.name}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          className="form-control"
                          type="phone"
                          name="phone"
                          id="phone"
                          placeholder="Mobile Number"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ShowError
                          touched={touched.phone}
                          message={errors.phone}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ShowError
                          touched={touched.email}
                          message={errors.email}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <textarea
                          className="form-control"
                          name="message"
                          id="message"
                          cols="20"
                          rows="3"
                          placeholder="Message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></textarea>
                        <ShowError
                          touched={touched.message}
                          message={errors.message}
                        />
                      </div>

                      {faqLoader ? (
                        <div className="text-center">
                          <OnClickLoader />
                        </div>
                      ) : (
                        <div className="text-center">
                          <button type="submit" className="fl-btn-green">
                            Send
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                  {/* <div className="p-3">
                    <div className="form-group mb-4">
                      <input
                        className="form-control"
                        type="text"
                        name=""
                        id=""
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <input
                        className="form-control"
                        type="text"
                        name=""
                        id=""
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <input
                        className="form-control"
                        type="text"
                        name=""
                        id=""
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <textarea
                        className="form-control"
                        name=""
                        id=""
                        cols="20"
                        rows="3"
                        placeholder="Message"
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <button className="fl-btn-green px-5">Send</button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerFaqs;
