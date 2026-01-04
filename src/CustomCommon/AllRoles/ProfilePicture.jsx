import { TextField } from "@mui/material";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";
import { toast } from "react-toastify";
import { useState } from "react";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import axios from "axios";
import OnClickLoader from "../Others/OnClickLoader";

export default function ProfilePicture({
  setFieldValue,
  inputName,
  profilePic,
}) {
  const [loading, setLoading] = useState(false);

  const apiurl = import.meta.env.VITE_BASE_API_URL;
  const url = `${apiurl}/admin/blog/upload/image`;

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const fileUrl = response?.data?.data;
        setFieldValue(inputName, fileUrl);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profile-img d-flex align-itmes-start gap-2 justify-content-center">
        <div className="profile-image-style">
          <img
            className="img-fluid"
            src={profilePic || dummyProfile}
            alt="profileImage"
          />
        </div>
        <span>
          {loading ? (
            <OnClickLoader />
          ) : (
            <label
              htmlFor="file-profile-upload"
              className="btn btn-profile-edit d-inline-block"
            >
              <img className="img-fluid" src={editIcon} alt="editIcon" />
            </label>
          )}

          <TextField
            type="file"
            id="file-profile-upload"
            variant="outlined"
            hidden
            name="profilePic"
            onChange={uploadImage}
          />
        </span>
        <span>
          <button
            type="button"
            className="btn btn-profile-delete d-inline-block"
          >
            <img className="img-fluid" src={deleteIcon} alt="deleteIcon" />
          </button>
        </span>
      </div>
    </>
  );
}
