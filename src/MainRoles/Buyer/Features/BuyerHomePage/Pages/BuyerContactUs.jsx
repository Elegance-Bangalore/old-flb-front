import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import BuyerFooter from "../Layouts/BuyerFooter";
import { FormControlLabel, Switch } from "@mui/material";
import { Whatsapp } from "iconsax-react";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import ShowError from "@/CustomCommon/Others/ShowError";
import { generalInquiryApi } from "@/ApiRoutes/BuyersApi";
import { useFormik } from "formik";
import { generalEnquiryValidations } from "@/Schemas/PostPropertySchema";
import { toast } from "react-toastify";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import { getContactUsApi } from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";

const BuyerContactUs = () => {
  const [contactLoader, setContactLoader] = useState(false);
  const [contactContent, setContactContent] = useState({});

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

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
    setContactLoader(true);
    generalInquiryApi(values)
      .then((res) => {
        setContactLoader(false);
        toast.success("Your query has been submitted successfully.");
        resetForm();
      })
      .catch((error) => {
        console.error("Error submitting query:", error);
        setContactLoader(false);
        toast.error(
          "An error occurred while submitting your query. Please try again later."
        );
      });
  }

  async function getContent() {
    try {
      const response = await getContactUsApi();
      if (response?.data?.contact?.length) {
        setContactContent(response?.data?.contact[0])
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      toastMessage()
    }
  }

  useEffect(() => {
    getContent();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  return (
    <>
      <main className="buyers-main h-100">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-heading-banner">
          <div className="container fl-container">
            <h1 className="fl-banner-heading fl-text-dark-green">
              {contactContent?.title}
            </h1>
            <p className="fl-banner-heading-normal fl-text-dark-green fw-semi-bold">
              {contactContent?.subtitle}
            </p>
          </div>
        </section>
        <section>
          <div className="container fl-container fl-mt-n-6">
            <div className="row">
              <div className="col-md-5">
                <div className="border fl-card-border border-raidus-10 mb-5">
                  <div className="px-4 py-3 fl-bg-light-dark mb-3">
                    <h4 className="fl-text-dark text-uppercase mb-0 fl-fs-22">
                      We'll be glad to hear from you.
                    </h4>
                  </div>
                  <div className="px-4 pt-2 pb-4">
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
                      {/* <div className="fl-bg-border-light-green swtich-container mb-4 ">
                                                <Whatsapp
                                                    size="32"
                                                    variant="Bulk"
                                                    className='fl-text-green'
                                                />
                                                <FormControlLabel
                                                    className='fl-text-dark-green' control={<Switch defaultChecked />}
                                                    label="Get updates on WhatsApp"
                                                    labelPlacement="start"
                                                />
                                            </div> */}
                      {contactLoader ? (
                        <div className="text-center">
                          <OnClickLoader />
                        </div>
                      ) : (
                        <div className="text-center">
                          <button
                            type="submit"
                            className="fl-btn-green px-5 fl-fs-20"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="border fl-card-border border-raidus-10 mb-5">
                  <div className="px-4 py-3 fl-bg-light-dark mb-3">
                    <h4 className="fl-text-dark text-uppercase mb-0 fl-fs-22">
                      Where to find us?
                    </h4>
                  </div>
                  <div className="px-4 pt-2 pb-4">
                    <div className="d-flex justify-content-between flex-wrap gap-2">
                      <div className="">
                        <p className="fl-text-dark fl-fs-16 mb-4">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                            >
                              <path
                                d="M7.02417 8.51158C7.7265 9.7466 8.7534 10.7735 9.98842 11.4758L10.6518 10.5471C10.8724 10.2384 11.2887 10.143 11.6217 10.3249C12.6768 10.9012 13.8428 11.2515 15.0592 11.3478C15.4492 11.3787 15.75 11.7042 15.75 12.0954V15.4426C15.75 15.8271 15.4591 16.1493 15.0766 16.1886C14.6792 16.2295 14.2783 16.25 13.875 16.25C7.45469 16.25 2.25 11.0453 2.25 4.625C2.25 4.2217 2.27057 3.82078 2.31142 3.42332C2.35073 3.04081 2.67296 2.75 3.05749 2.75H6.40456C6.79583 2.75 7.12135 3.05078 7.15222 3.44082C7.2485 4.65716 7.59877 5.82323 8.17515 6.87833C8.35703 7.2113 8.26162 7.62766 7.95292 7.84818L7.02417 8.51158ZM5.13319 8.0189L6.55815 7.00107C6.1541 6.12885 5.87721 5.20387 5.73545 4.25H3.7568C3.75227 4.37474 3.75 4.49975 3.75 4.625C3.75 10.2169 8.28315 14.75 13.875 14.75C14.0002 14.75 14.1253 14.7478 14.25 14.7432V12.7645C13.2962 12.6228 12.3712 12.3459 11.4989 11.9419L10.4811 13.3668C10.0694 13.2069 9.6717 13.0186 9.29055 12.8046L9.24697 12.7797C7.77728 11.944 6.55601 10.7227 5.72025 9.25303L5.69545 9.20945C5.48137 8.8283 5.29316 8.43065 5.13319 8.0189Z"
                                fill="#00A76F"
                              />
                            </svg>
                          </span>
                          &nbsp;<a
                            className="fl-text-dark"
                            href={`tel:+91${contactContent?.number}`}>

                            +91 {contactContent?.number}
                          </a>
                          {contactContent?.alternateNumber && <a
                            className="fl-text-dark"
                            href={`tel:+91${contactContent?.alternateNumber}`}
                          >
                            , +91 {contactContent?.alternateNumber}
                          </a>}

                        </p>
                      </div>
                      <div className="">
                        <p className="fl-text-dark fl-fs-16">
                          <a
                            className="fl-text-dark"
                            href={`mailto:${contactContent?.email}`}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                              >
                                <path
                                  d="M2.25 2.75H15.75C16.1642 2.75 16.5 3.08579 16.5 3.5V15.5C16.5 15.9142 16.1642 16.25 15.75 16.25H2.25C1.83579 16.25 1.5 15.9142 1.5 15.5V3.5C1.5 3.08579 1.83579 2.75 2.25 2.75ZM15 5.92844L9.05385 11.2535L3 5.91195V14.75H15V5.92844ZM3.38359 4.25L9.04642 9.2465L14.6257 4.25H3.38359Z"
                                  fill="#00A76F"
                                />
                              </svg>
                            </span>
                            &nbsp;{contactContent?.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="fl-text-dark fl-fs-16">
                        <a className="fl-text-dark">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M9 17.7959L4.22703 13.023C1.59099 10.3869 1.59099 6.11307 4.22703 3.47703C6.86307 0.84099 11.1369 0.84099 13.773 3.47703C16.409 6.11307 16.409 10.3869 13.773 13.023L9 17.7959ZM12.7123 11.9623C14.7625 9.91208 14.7625 6.58794 12.7123 4.53769C10.6621 2.48744 7.33794 2.48744 5.28769 4.53769C3.23744 6.58794 3.23744 9.91208 5.28769 11.9623L9 15.6746L12.7123 11.9623ZM9 9.75C8.17155 9.75 7.5 9.07845 7.5 8.25C7.5 7.42157 8.17155 6.75 9 6.75C9.82845 6.75 10.5 7.42157 10.5 8.25C10.5 9.07845 9.82845 9.75 9 9.75Z"
                                fill="#00A76F"
                              />
                            </svg>
                          </span>
                          &nbsp;{contactContent?.address}
                        </a>
                      </p>
                    </div>
                    <div className="">
                      <iframe
                        src={contactContent?.link}
                        width="100"
                        height="515"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
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

export default BuyerContactUs;
