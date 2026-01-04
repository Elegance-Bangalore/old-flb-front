import { agricultureLand, farmhouse } from "@/CustomServices/Constant";
import * as Yup from "yup";

const youtubeUrlRegex = /\/embed\/([^"&?\/\s]{11})/;
const googleMapsEmbedRegex =
  /^(https:\/\/www\.google\.com\/maps\/embed\?[^'">\s]+)$|<iframe.*?src="(https:\/\/www\.google\.com\/maps\/embed\?[^"]+)".*?><\/iframe>/;

export const postPropertySchema = Yup.object({
  propertyType: Yup.string().required("Property type is required"),
  bedrooms: Yup.number().typeError("Please enter valid number"),
  bathrooms: Yup.number().typeError("Please enter valid number"),
  plotArea: Yup.string().required("Project Area is required"),
  plotLength: Yup.number().typeError("Please enter a valid number"),
  plotBreadth: Yup.number().typeError("Please enter a valid number"),
  totalAcre: Yup.number()
    .typeError("Please enter a valid number")
    .required("Total Project Area is required"),
  minArea: Yup.number().required("Minimum Area is required"),
  maxArea: Yup.number().test(
    "is-greater-than-minArea",
    "Maximum Area should be greater than Minimum Area",
    function (value) {
      const { minArea } = this.parent;
      return !value || value > minArea;
    }
  ),
  price: Yup.number().required("Minimum Price is required"),
  priceMax: Yup.number().test(
    "is-greater-than-price",
    "Maximum Price should be greater than Minimum Price",
    function (value) {
      const { price } = this.parent;
      return !value || value > price;
    }
  ),
  pricePerSqft: Yup.number(),
  propertyDescription: Yup.string()
    .required("Description is required")
    .min(100, "Description should be atleast 100 words"),
  city: Yup.string().required("City is required"),
  locality: Yup.string().required("Locality is required"),
  map: Yup.string()
    .required("Map Link is required")
    .matches(googleMapsEmbedRegex, "Invalid Google Maps embed URL"),
  // amenities: Yup.array().min(1, "At least 1 Amenity is required"),
  layoutMap: Yup.array(),
  images: Yup.array().min(4, "At Least 4 Gallery images is required"),
  propertyTitle: Yup.string().required("Property Title is required"),
  videoUrl: Yup.string().matches(
    youtubeUrlRegex,
    "Invalid YouTube video URL! Only Embded link is valid"
  ),
  heroImage: Yup.string().required("Featured Image is required"),
  state: Yup.string().required("State is required"),
  logo: Yup.string().required("Property Logo is required"),
  areaType: Yup.string().required("Area Dimension is required"),
  documentName: Yup.string().required("Document Type is required"),
  documentFile: Yup.mixed().required("Document File is required"),
  ageOfProperty: Yup.string().when("propertyType", {
    is: farmhouse,
    then: (schema) => schema.required("Age of property is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  farmhouseStatus: Yup.string().when("propertyType", {
    is: farmhouse,
    then: (schema) => schema.required("Farmhouse Status is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ownershipType:Yup.string().when("propertyType", {
    is: farmhouse,
    then: (schema) => schema.required("Ownership type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  facing: Yup.string().when("propertyType", {
    is: agricultureLand,
    then: (schema) => schema.required("Facing is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  transactionType: Yup.string().required("Trasnaction Type is required"),
});

export const postPropertySchemaAdmin = Yup.object({
  // propertyType: Yup.string().required("Property type is required"),
  // bedrooms: Yup.number().typeError("Please enter valid number"),
  // bathrooms: Yup.number().typeError("Please enter valid number"),
  // plotArea: Yup.string().required("Project Area is required"),
  // plotLength: Yup.number().typeError("Please enter a valid number"),
  // plotBreadth: Yup.number().typeError("Please enter a valid number"),
  // totalAcre: Yup.number()
  //   .typeError("Please enter a valid number")
  //   .required("Total Project Area is required"),
  // minArea: Yup.number().required("Minimum Area is required"),
  // maxArea: Yup.number().test(
  //   "is-greater-than-minArea",
  //   "Maximum Area should be greater than Minimum Area",
  //   function (value) {
  //     const { minArea } = this.parent;
  //     return !value || value > minArea;
  //   }
  // ),
  // price: Yup.number().required("Minimum Price is required"),
  // priceMax: Yup.number().test(
  //   "is-greater-than-price",
  //   "Maximum Price should be greater than Minimum Price",
  //   function (value) {
  //     const { price } = this.parent;
  //     return !value || value > price;
  //   }
  // ),
  // pricePerSqft: Yup.number(),
  // propertyDescription: Yup.string()
  //   .required("Description is required")
  //   .min(100, "Description should be atleast 100 words"),
  // city: Yup.string().required("City is required"),
  // locality: Yup.string().required("Locality is required"),
  // map: Yup.string()
  //   .required("Map Link is required")
  //   .matches(googleMapsEmbedRegex, "Invalid Google Maps embed URL"),
  // amenities: Yup.array().min(1, "At least 1 Amenity is required"),
  // layoutMap: Yup.array(),
  // images: Yup.array().min(4, "At Least 4 Gallery images is required"),
  // propertyTitle: Yup.string().required("Property Title is required"),
  // videoUrl: Yup.string().matches(
  //   youtubeUrlRegex,
  //   "Invalid YouTube video URL! Only Embded link is valid"
  // ),
  // heroImage: Yup.string().required("Featured Image is required"),
  // state: Yup.string().required("State is required"),
  // logo: Yup.string().required("Property Logo is required"),
  // areaType: Yup.string().required("Area Dimension is required"),
  // documentName: Yup.string().required("Document Type is required"),
  // documentFile: Yup.mixed().required("Document File is required"),
  //  ageOfProperty: Yup.string().when("propertyType", {
  //   is: farmhouse,
  //   then: (schema) => schema.required("Age of property is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // farmhouseStatus: Yup.string().when("propertyType", {
  //   is: farmhouse,
  //   then: (schema) => schema.required("Farmhouse Status is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // ownershipType:Yup.string().when("propertyType", {
  //   is: farmhouse,
  //   then: (schema) => schema.required("Ownership type is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // facing: Yup.string().when("propertyType", {
  //   is: agricultureLand,
  //   then: (schema) => schema.required("Facing is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  sellerId: Yup.string().required("Seller is required"),
});

export const postEnquirySchema = Yup.object({
  buyerName: Yup.string().required("Name is required"),
  buyerEmail: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  buyerPhone: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit number")
    .required("Phone number is required"),
  propertyId: Yup.string().required("Property is required"),
});

export const postEnquirySchemaBuyerPropertyDetailPage = Yup.object({
  buyerName: Yup.string().required("Name is required"),
  buyerEmail: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  buyerPhone: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit number")
    .required("Phone number is required"),
  propertyId: Yup.string().required("Property is required"),
});
export const generalEnquiryValidations = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit number")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

// Updated schema for the new inquiry form
export const postEnquirySchemaBuyerPropertyDetailPageUpdated = Yup.object({
  buyerName: Yup.string().required("Name is required"),
  buyerEmail: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  buyerPhone: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit number")
    .required("Phone number is required"),
  propertyId: Yup.string().required("Property is required"),
  reasonToBuy: Yup.string().required("Please select a reason to buy"),
});
