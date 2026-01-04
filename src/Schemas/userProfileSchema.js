import * as Yup from "yup";

export const userProfileSchema = Yup.object({
  fullName: Yup.string().required("Please enter your name"),
  phone: Yup.string()
    .required("Please enter your phone number")
    .min(10, "Invalid Phone no."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    )
    .required("Please enter an email address"),

  website: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url! eg: www.fictivebox.com"
  ),
});

export const buyerProfileSchema = Yup.object({
  fullName: Yup.string().required("Please enter your name"),
});
