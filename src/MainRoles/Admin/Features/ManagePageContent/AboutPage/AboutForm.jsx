import React, { useEffect, useState } from "react";
import HeroSection from "../Common/HeroSection";
import PageContent from "./PageContent";
import { useFormik } from "formik";
import { createAboutUsApi, getAboutUsApi, updateAboutUsApi } from "@/ApiRoutes/AdminApi";
import Goals from "./Goals";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Backdrop, CircularProgress } from "@mui/material";
import { aboutUsSchema } from "@/MainRoles/Admin/AdminSchema/adminSchema";



function AboutForm() {

    const [loader, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(true);
    const [update, setUpdate] = useState(false)

    const missionData = {
        heading: "",
        description: "",
        icon: ""
    }

    const initialValues = {
        title: "",
        subtitle: "",
        heroImage: "",
        content: "",
        logo: "",
        mission: [missionData]
    }

    const Formik = useFormik({
        initialValues,
        validationSchema: aboutUsSchema,
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
            await createAboutUsApi(value);
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
            await updateAboutUsApi(value);
            toastMessage(200, "Content Updated Successfully")
        } catch (error) {
            toastMessage()
        } finally {
            setLoader(false)
        }
    }

    async function getContent(value) {
        try {
            setPageLoader(true)
            const response = await getAboutUsApi(value);
            if (response.data.about.length) {
                setValues(response.data.about[0])
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
        <>
            <div >
                <h4 className="mb-3">Hero Section</h4>
                <HeroSection Formik={Formik} />
            </div>
            <hr></hr>
            <div className="my-3">
                <h4 className="mb-3">Content Section</h4>
                <PageContent Formik={Formik} />
            </div>
            <hr></hr>
            <div className="my-3">
                <h4 className="mb-3">Goals</h4>
                <Goals Formik={Formik} />
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

        </>
    )
}

export default AboutForm