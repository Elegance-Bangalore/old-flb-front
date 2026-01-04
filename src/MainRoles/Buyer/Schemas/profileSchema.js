import * as Yup from "yup";

export const ownerProfileSchema = Yup.object({
  fullName: Yup.string().required("Please enter your name"),
  phone: Yup.string()
    .required("Please enter Phone number")
    .matches(/^[0-9]{10}$/, "Please enter valid number"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter an email address"),
  alternateNumber: Yup.string().matches(
    /^[0-9]{10}$/,
    "Please enter valid number"
  ),
});

export const developerProfileSchema = Yup.object({
  fullName: Yup.string().required("Please enter your name"),
  city: Yup.string().required("Please enter City"),
  phone: Yup.string()
    .required("Please enter Phone number")
    .matches(/^[0-9]{10}$/, "Please enter valid number"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter an email address"),
  companyName: Yup.string()
    .required("Please enter Company name")
    .test(
      "no-leading-trailing-spaces",
      "Company name should not have leading or trailing spaces",
      (value) => value === value?.trim()
    ),
  establishedYear: Yup.string(),
  website: Yup.string(),
  address: Yup.string().required("Please enter your Address"),
  alternateNumber: Yup.string().matches(
    /^[0-9]{10}$/,
    "Please enter valid number"
  ),
  logo: Yup.string().nullable(),
  about: Yup.string().min(100, "Should be atleast 100 characters"),
});

export const adminDeveloperProfile = Yup.object({
  // companyName: Yup.string().required("Please enter Company name"),
  // website: Yup.string().required("Please enter your Website"),
  // address: Yup.string().required("Please enter your Address"),
  // logo: Yup.string().required("Please upload company logo"),
  // about: Yup.string().required("About is required").min(100 , "Minimum length is 100").max(500 , "Maximum length is 500"),
  phone: Yup.string()
    .required("Please enter Phone number")
    .matches(/^[0-9]{10}$/, "Please enter valid number"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter an email address"),
});
