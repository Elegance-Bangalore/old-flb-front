import {
  addTermsAndConditionsApi,
  getTermsAndConditionsApi,
  updateTermsAndConditionsApi,
} from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import NewAdminSidebar from "@/MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function TermsConditionMain() {
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [update, setUpdate] = React.useState(null);
  const editor = useRef(null);

  async function addTerms() {
    try {
      const response = await addTermsAndConditionsApi({
        termsCondition: content,
      });
      toastMessage(200, "Content Added Successfully");
    } catch (error) {
      toastMessage();
      console.log("Response", error);
    }
  }

  async function getContent() {
    try {
      const response = await getTermsAndConditionsApi();
      if (response?.data?.terms?.length) {
        setContent(response?.data?.terms[0]?.termsCondition);
        setUpdate(response?.data?.terms[0]?._id);
      }
    } catch (error) {
      toastMessage();
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateTerms() {
    try {
      setLoading(true);
      const response = await updateTermsAndConditionsApi({
        termsCondition: content,
        _id: update,
      });
      toastMessage(200, "Content Updated Successfully");
    } catch (error) {
      toastMessage();
      console.log("Response", error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageUpload = async (files) => {
    try {
      const response = await uploadImageApi(files[0]);
      return response.data.location;
    } catch (error) {
      return null;
    }
  };

  const sanitizeContent = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    tempDiv.querySelectorAll("p").forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector("img")) {
        p.remove();
      }
    });

    tempDiv.querySelectorAll("br").forEach((br) => {
      const parent = br.parentElement;
      if (!parent.textContent.trim() && !parent.querySelector("img")) {
        br.remove();
      }
    });

    return tempDiv.innerHTML.trim();
  };

  const handleBlur = (newContent) => {
    const sanitizedContent = sanitizeContent(newContent);
    setContent(sanitizedContent);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <NewAdminSidebar>
      <div className="container-fluid ovh">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title mt-5 mb-3 pb-3">
                Terms and Conditions
              </h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mt-5 mb-3 text-end">
              <Link to="/terms">
                <button className="btn-black">Preview</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => newContent}
            onBlur={(newContent) => handleBlur(newContent)}
            config={{
              uploader: {
                insertImageAsBase64URI: true,
                imagesExtensions: ["jpg", "jpeg", "png", "gif"],
                process: handleImageUpload,
              },
              events: {
                paste: (event) => {
                  const clipboardData =
                    event.clipboardData || window.clipboardData;
                  const pastedData =
                    clipboardData.getData("text/html") ||
                    clipboardData.getData("text/plain");
                  if (editor.current) {
                    editor.current.selection.insertHTML(pastedData);
                  }
                  event.preventDefault();
                },
              },
            }}
          />

          <div>
            <button
              className="btn-black mt-3"
              disabled={loading}
              onClick={update ? updateTerms : addTerms}
            >
              {loading ? "Saving..." : update ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </NewAdminSidebar>
  );
}

export default TermsConditionMain;
