import React from 'react'
import { changePasswordSchema } from "@/Schemas/ChangePasswordSchema";
import { useFormik } from "formik";
import { toastMessage } from "@/CustomServices/ToastMessage";
import ShowError from "@/CustomCommon/Others/ShowError";
import { changePasswordApi } from "@/ApiRoutes/SellerApis";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { toast } from "react-toastify";
import { useState } from "react";
import { FormControl, TextField } from "@mui/material";

function ChangePassword() {
    const [loader, setLoader] = useState(false);

    const initialValues = {
        password: "",
        newPassword: "",
        confirmPassword: "",
    };

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
        resetForm,
    } = useFormik({
        initialValues,
        validationSchema: changePasswordSchema,
        onSubmit: (values) => {
            changePassword(values);
        },
    });

    async function changePassword(value) {
        try {
            setLoader(true);
            const response = await changePasswordApi(value);
            const { status, message } = await response.data;
            toastMessage(status, message);
            if (status === 200) {
                resetForm();
            }
        } catch (error) {
            toastMessage(error?.response?.status , error?.response?.data?.error)
            throw error;
        } finally {
            setLoader(false);
        }
    }


    return (
        <>
            <div className='mt-5'>
                <h4 className="text-medium-grey text-uppercase ">
                    Change Password
                </h4>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <FormControl className="mb-4">
                        <TextField
                            label="Old Password"
                            variant="outlined"
                            name="password"
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <ShowError
                            touched={touched.password}
                            message={errors.password}
                        />
                    </FormControl>
                </div>

                <div className='col-md-6'>
                    <FormControl className="mb-4">
                        <TextField
                            label="New Password"
                            variant="outlined"
                            name="newPassword"
                            type='password'
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <ShowError
                            touched={touched.newPassword}
                            message={errors.newPassword}
                        />
                    </FormControl>
                </div>

                <div className='col-md-6'>
                    <FormControl className="mb-4">
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            name="confirmPassword"
                            type='password'
                            value={values?.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <ShowError
                            touched={touched.confirmPassword}
                            message={errors.confirmPassword}
                        />
                    </FormControl>
                </div>

                <div className="col-xl-12 text-right">
                    {loader ? (
                        <div className="text-center">
                            <OnClickLoader />
                        </div>
                    ) : (
                        <div className="my_profile_setting_input text-center fn-520">
                            <button className="btn-black" onClick={handleSubmit}>
                                Change Password
                            </button>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default ChangePassword