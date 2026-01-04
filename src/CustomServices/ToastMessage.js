import { toast } from "react-toastify";
import { removeCookie } from "./GetCookies";
import { setUser, setLogout } from "@/Redux/Auth/authSlice";

export function toastMessage(
  status,
  message = "An unexpected error occurred.",
  dispatch
) {
  switch (status) {
    case 200:
    case 201:
      toast.success(message);
      break;
    case 400:
    case 403:
    case 422:
      return toast.error(message);
    case 429:
      return toast.error(
        "Too many requests at the moment, please try again after some time"
      );
    case 401:
      removeCookie("token");
      toast.error(message);
      dispatch(setLogout());
      break;
    case 500:
      return toast.error(
        "Oops! There is a server error. Please try again later."
      );
    default:
      return toast.error("An unexpected error occurred.");
  }
}
