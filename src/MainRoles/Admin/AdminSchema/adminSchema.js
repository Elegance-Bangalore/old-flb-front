import { trendingVideos } from "@/CustomServices/Constant";
import { property } from "lodash";
import * as Yup from "yup";
const youtubeUrlRegex = /\/embed\/([^"&?\/\s]{11})/;

const googleMapsEmbedRegex =
  /^(https?:\/\/)?(www\.)?google\.com\/maps\/embed\?[^'">\s]+$/;

export const faqSchema = Yup.object({
  category: Yup.string().required("Please select Category"),
  question: Yup.string().required("Please enter Question"),
  answers: Yup.string().required("Please enter Answer"),
});

export const userSchema = Yup.object({
  username: Yup.string().required("Please enter username"),
  phone: Yup.string()
    .required("Please enter Phone number")
    .matches(/^[0-9]{10}$/, "Please enter valid number"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter an email address"),

  password: Yup.string()
    .required("Please enter password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character (!@#$%^&*)"
    )
    .max(16),
});

export const userSchemaUpdate = Yup.object({
  username: Yup.string().required("Please enter username"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter an email address"),
  phone: Yup.string()
    .required("Please enter Phone number")
    .matches(/^[0-9]{10}$/, "Please enter valid number"),
});

export const contactUsSchema = Yup.object({
  title: Yup.string().required("Please enter Title"),
  subtitle: Yup.string().required("Please enter SubTitle"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter email"),
  number: Yup.string()
    .required("Please enter Phone number")
    .matches(/^[0-9]{10}$/, "Please enter valid number"),
  alternateNumber: Yup.string().matches(
    /^[0-9]{10}$/,
    "Please enter valid number"
  ),
  address: Yup.string().required("Please enter Address"),
  link: Yup.string()
    .required("Please enter Address")
    .matches(googleMapsEmbedRegex, "Invalid Google Maps embed URL"),
});

export const propertyCategorySchema = Yup.object({
  name: Yup.string().required("Please enter catergory"),
  order: Yup.string().required("Please enter order"),
});

export const aboutUsSchema = Yup.object({
  title: Yup.string().required("Please enter Title"),
  subtitle: Yup.string().required("Please enter SubTitle"),
  content: Yup.string().required("Please enter Content"),
  logo: Yup.string().required("Please fill logo"),
  heroImage: Yup.string().required("Please fill Hero Image"),
  mission: Yup.array().of(
    Yup.object().shape({
      heading: Yup.string().required("This field is required."),
      description: Yup.string().required("This field is required."),
      icon: Yup.string().required("This field is required."),
    })
  ),
});

export const blogAddSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  title: Yup.string().required("Title is required"),
  content: Yup.string().when("categoryName", {
    is: trendingVideos,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Please enter Content"),
  }),
  logo: Yup.string().when("categoryName", {
    is: trendingVideos,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Please enter Content"),
  }),
  selectDate: Yup.string().required("Date is required"),
  // subCategory: Yup.mixed().required("Sub Category is required"),
  youtubeLink: Yup.string().when("categoryName", {
    is: trendingVideos,
    then: (schema) =>
      schema
        .required("YouTube video URL is required")
        .matches(
          youtubeUrlRegex,
          "Invalid YouTube video URL! Only Embed link is valid"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export const footerSeoSchema = Yup.object({
  title: Yup.string().required("Please enter title"),
  propertyType: Yup.string().required("Please select property type"),
  city: Yup.mixed().required("Please select property type"),
});

export const featuredPropertySchema = Yup.object({
  title: Yup.string().required("Please enter title"),
  desktopImage: Yup.string().required("Desktop Image is required"),
  mobileImage: Yup.string().required("Mobile Image property"),
  url: Yup.string().url("Invalid URL format").required("URL is required"),
});

export const testimonialSchema = Yup.object({
  type: Yup.string()
    .required("Type is required")
    .oneOf(["Review", "Link"], "Please select either Review or Link"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Maximum length is 500"),
  // youTubeLink: Yup.string().matches(
  //   youtubeUrlRegex,
  //   "Invalid YouTube video URL! Only Embded link is valid"
  // ),
});

export const mediaSchema = Yup.object({
  link: Yup.string().url("Invalid format").required("URL is required"),
  mediaImage: Yup.string().required("Media Image is required"),
});

export const promotionBannerSchema = Yup.object({
  url: Yup.string().url("Invalid URL format").required("URL is required"),
  banner: Yup.string().required("Banner is required"),
  url: Yup.string().when("bannerType", {
    is: "Detail Page - Property",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("URL is required"),
  }),
  city: Yup.array()
    .of(Yup.string().required("City name is required"))
    .min(1, "At least one city must be selected"), // Ensures each city is a string and required,

  propertyType: Yup.string().when("bannerType", {
    is: "List Page",
    then: (schema) => schema.required("Property Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  propertyId: Yup.string().when("bannerType", {
    is: "Detail Page - Property",
    then: (schema) => schema.required("Property is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const advertiseFormSchema = Yup.object().shape({
  companyName: Yup.string().required("Company/Organization Name is required"),
  cityOfHeadQuarter: Yup.string().required("City of Headquarter is required"),
  fullName: Yup.string().required("Full Name is required"),
  designation: Yup.string().required("Designation is required"),
  businessEmailAddress: Yup.string()
    .email("Invalid email address")
    .required("Business Email Address is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits")
    .required("Mobile Number is required"),
  spaceRequirement: Yup.array()
    .min(1, "Please select at least one Area Requirement")
    .required("Area Requirement is required"),
  description: Yup.string()
    .max(200, "Description must not exceed 200 words")
    .required("Description is required"),
});
