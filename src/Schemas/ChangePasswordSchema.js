import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  password: Yup.string().required("Please enter your password"),
  newPassword: Yup.string()
    .required("Please enter new password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character with minimum length 8"
    )
    .max(16),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm password field is not matching with new password"
    ),
});
