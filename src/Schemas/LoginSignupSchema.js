import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Please enter email address"),
  password: Yup.string().required("Please enter password"),
});

export const signupSchema = Yup.object({
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
  interested: Yup.string()
    .required("Please select a role")
    .oneOf(["buy", "sell"], "Please select either Buy or Sell"),

  i_am: Yup.string().when("interested", {
    is: "sell",
    then: (schema) =>
      schema
        .required("Please select one")
        .oneOf(
          ["owner", "developer"],
          "Please select either Owner or Developer"
        ),
  }),

  password: Yup.string()
    .required("Please enter password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character (!@#$%^&*)"
    )
    .max(16),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password field is not matching with password"
    ),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Please enter password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character (!@#$%^&*)"
    )
    .max(16),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password field is not matching with password"
    ),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
    "Please enter a valid email address"
  ),
});
