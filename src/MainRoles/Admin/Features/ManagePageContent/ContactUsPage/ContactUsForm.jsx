import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Box,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { createContactUsApi, getContactUsApi, updateContactUsApi } from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import ShowError from "@/CustomCommon/Others/ShowError";
import { contactUsSchema } from "@/MainRoles/Admin/AdminSchema/adminSchema";

function ContactUsForm() {

    const [loader, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);
    const [update, setUpdate] = useState(false)


    const initialValues = {
        title: "",
        subtitle: "",
        email: "",
        number: "",
        alternateNumber: "",
        address: "",
        link: "",
    }

    const Formik = useFormik({
        initialValues,
        validationSchema: contactUsSchema,
        onSubmit: (values) => {
            if (update) {
                updateContent(values)
                return
            }
            addContent(values)
        },
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
    } = Formik

    async function addContent(value) {
        try {
            setLoader(true)
            await createContactUsApi(value);
            toastMessage(200, "Content Added Successfully")
        } catch (error) {
            toastMessage()
        } finally {
            setLoader(false)
        }
    }

    async function updateContent(value) {
        try {
            setLoader(true)
            await updateContactUsApi(value);
            toastMessage(200, "Content Updated Successfully")
        } catch (error) {
            toastMessage()
        } finally {
            setLoader(false)
        }
    }

    async function getContent() {
        try {
            setPageLoader(true)
            const response = await getContactUsApi();
            if (response.data.contact.length) {
                setValues(response.data.contact[0])
                setUpdate(true)
            }
        } catch (error) {
            toastMessage()
        } finally {
            setPageLoader(false)
        }
    }

    useEffect(() => {
        getContent()
    }, [])


    return (
        <div className="row">
            <div className="col-md-6 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.title} message={errors.title} />
            </div>

            <div className="col-md-6 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Sub Title"
                        variant="outlined"
                        name="subtitle"
                        value={values.subtitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.subtitle} message={errors.subtitle} />
            </div>

            <div className="col-md-6 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.email} message={errors.email} />
            </div>

            <div className="col-md-6 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined"
                        name="number"
                        value={values.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.number} message={errors.number} />
            </div>

            <div className="col-md-6 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Alternate Phone"
                        variant="outlined"
                        name="alternateNumber"
                        value={values.alternateNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.alternateNumber} message={errors.alternateNumber} />
            </div>

            <div className="col-md-12 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        name="address"
                        multiline
                        rows={2}
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.address} message={errors.address} />
            </div>

            <div className="col-md-12 mb-5">
                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Google Map Embded Link"
                        variant="outlined"
                        name="link"
                        multiline
                        rows={2}
                        value={values.link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <ShowError touched={touched.link} message={errors.link} />
            </div>


            <div>
                <button className="btn-black" disabled={loader} onClick={handleSubmit}>{loader ? "Saving..." : update ? "Update" : "Save"}</button>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default ContactUsForm