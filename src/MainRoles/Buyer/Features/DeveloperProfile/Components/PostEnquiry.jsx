import React, { useState } from 'react'
import { selectUser } from '@/Redux/Auth/authSlice'
import { useSelector } from "react-redux"
import { useFormik } from "formik";
import { postEnquirySchema } from '@/Schemas/PostPropertySchema';
import { postInquiryApi } from '@/ApiRoutes/BuyersApi';
import { toastMessage } from '@/CustomServices/ToastMessage';
// import ShowError from '@/CustomCommon/Others/ShowError';
import ShowError from '@/CustomCommon/Others/ShowError';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SellerDetailModal from '@/components/Modals/SellerDetailModal';
function PostEnquiry({ propertyList }) {

    const user = useSelector(selectUser);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [sellerDetailOpen , setSellerDetailOpen] = useState(false)


    const initialValues = {
        buyerName: user ? user.fullName : "",
        buyerEmail: user ? user.email : "",
        buyerPhone: user ? user.phone : "",
        propertyId: "",
    };

    const Formik = useFormik({
        initialValues,
        validationSchema: postEnquirySchema,
        onSubmit: (values) => {
            postInquiry(values);
        },
    });



    const { values, handleChange, handleBlur, errors, setValues, handleSubmit, touched, resetForm } = Formik
    async function postInquiry(value) {
        setLoader(true);
        try {
            const response = await postInquiryApi(value);
            const { status, message } = response.data;
            toastMessage(status, message);
            resetForm()
        } catch (error) {
            toastMessage()
            throw error;

        } finally {
            setLoader(false);
        }
    }


    const postProperty = () => {
        if (!user) {
          toast.success("Please make a seller account first");
          navigate("/post-your-property", { state: { interested: "sell" } });
        } else if (user.interested === buy) {
          toast.info("Please login as seller");
        } else if (user.interested === admin || user.interested === subAdmin) {
          navigate("/admin/add-property");
        } else if (user.interested === sell) {
          navigate("/seller/post-property");
        }
      }


    return (
        <>
            <div className="col-lg-3 fl-sticky">
                <div className="border fl-card-border border-raidus-10 mb-5">
                    <div className="px-4 py-3 text-center fl-bg-light-dark mb-3">
                        <h4 className='fl-text-dark text-uppercase mb-0 fl-fs-22'>Get Seller Details Now!</h4>
                    </div>
                    <div className="p-3">
                        <form>
                            <div className="form-group mb-4">
                                <input className='form-control' type="text" name="buyerName" id="" placeholder='Full Name' value={values.buyerName} onChange={handleChange} onBlur={handleBlur} />
                                <ShowError touched={touched.buyerName} message={errors.buyerName} />
                            </div>
                            <div className="form-group mb-4">
                                <input className='form-control' type="phone" name="buyerPhone" id="" required placeholder='Mobile Number' value={values.buyerPhone} onChange={handleChange} onBlur={handleBlur} />
                                <ShowError touched={touched.buyerPhone} message={errors.buyerPhone} />
                            </div>
                            <div className="form-group mb-4">
                                <input className='form-control' type="email" id="" placeholder='Email' name='buyerEmail' value={values.buyerEmail} onChange={handleChange} onBlur={handleBlur} />
                                <ShowError touched={touched.buyerEmail} message={errors.buyerEmail} />
                            </div>
                            <div className='form-group mb-4'>
                                <select className='form-select' value={values.propertyId} onChange={handleChange} onBlur={handleBlur} name='propertyId' >
                                    <option value="" disabled>Select Property</option>
                                    {propertyList?.map((property) => (
                                        <option value={property._id} key={property._id}>{property.propertyTitle}</option>
                                    ))}

                                </select>
                                <ShowError touched={touched.propertyId} message={errors.propertyId} />
                            </div>
                            <div className="text-center">
                                <button className='fl-btn-green' type='submit' onClick={handleSubmit}>{loader ? "Sending..." : "Send Enquiry"}</button>
                            </div>
                        </form>
                    </div>
                </div>
                {!user && <div className="border fl-border-dark-green border-raidus-10 fl-bg-light-green px-4 py-5 text-center">
                    <h4 className='fl-ff-main fl-text-dark fl-fs-20'>Unlock the Potential of Your Land! </h4>
                    <p className='fl-ff-main fl-text-dark fw-semi-bold fl-16 mb-4'>Post Your Property Today and Connect with Interested Buyers!</p>
                    <button className='fl-btn-yellow' onClick={postProperty}>Post your property</button>
                </div>}

            </div>
            <SellerDetailModal show={sellerDetailOpen} handleClose={() => setSellerDetailOpen(false)} />
        </>
    )
}

export default PostEnquiry