import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getCookie } from "@/CustomServices/GetCookies";
import { uploadImageApi } from "@/ApiRoutes/AdminApi";

export default function CkEditor() {

    const apiurl = import.meta.env.VITE_BASE_API_URL;


    // const handleImageUpload = async (file) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("image", file);
    //         const token = getCookie("token");
    //         console.log("FormData:", formData); 
    //         const response = await fetch(`${apiurl}/admin/blog/upload/image`, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "multipart/form-data"
    //             },
    //             body: formData,
    //         });
    //         const data = await response.json();
    //         return { default: data.imageUrl };
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //         return null;
    //     }
    // };

    const handleImageUpload = async (files) => {
        try {
            console.log("File:", files[0]);
            const response = await uploadImageApi(files[0]);
            return response.data.location;
        } catch (error) {
            return null;
        }
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                toolbar: [
                    'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                    'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                    'imageUpload', 'mediaEmbed', 'undo', 'redo'
                ],
                ckfinder: {
                    uploadUrl: `${apiurl}/admin/blog/upload/image`,
                }
            }}
            onInit={(editor) => {
                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    return {
                        upload: async () => {
                            const file = await loader.file;
                            // return handleImageUpload(file);
                        }
                    };
                };
            }}
        />
    );
}
