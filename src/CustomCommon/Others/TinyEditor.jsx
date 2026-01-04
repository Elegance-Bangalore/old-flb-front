import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const TinyEditor = ({ setFieldValue, name, content , height=600 }) => {

    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY
    const apiurl = import.meta.env.VITE_BASE_API_URL;

    const handleEditorChange = (content, editor) => {
        // setContent(content);
        setFieldValue(name, content);
    };

    const uploadImage = (blobInfo, progress, success, failure) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = `${apiurl}/admin/blog/upload/image`;
            xhr.open("POST", url, true);
            const formData = new FormData();
            formData.append("image", blobInfo.blob(), blobInfo.filename());

            xhr.upload.onprogress = (e) => {
                if (progress) {
                    progress((e.loaded / e.total) * 100);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 403) {
                    reject({ message: "HTTP Error: " + xhr.status, remove: true });
                    return;
                }

                if (xhr.status < 200 || xhr.status >= 300) {
                    reject("HTTP Error: " + xhr.status);
                    return;
                }

                const json = JSON.parse(xhr.responseText);

                if (!json || typeof json.data.Location !== "string") {
                    reject("Invalid JSON: " + xhr.responseText);
                    return;
                }

                resolve(json.data.Location);
                success(json.data.Location);
            };

            xhr.onerror = () => {
                reject({ message: "Image upload failed", remove: true });
                failure("Image upload failed");
            };

            xhr.send(formData);
        });
    };

    // Video upload handler
    const uploadVideo = (blobInfo, progress, success, failure) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = `${apiurl}/admin/blog/upload/video`;
            xhr.open("POST", url, true);
            const formData = new FormData();
            formData.append("video", blobInfo.blob(), blobInfo.filename());

            xhr.upload.onprogress = (e) => {
                if (progress) {
                    progress((e.loaded / e.total) * 100);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 403) {
                    reject({ message: "HTTP Error: " + xhr.status, remove: true });
                    return;
                }

                if (xhr.status < 200 || xhr.status >= 300) {
                    reject("HTTP Error: " + xhr.status);
                    return;
                }

                const json = JSON.parse(xhr.responseText);

                if (!json || typeof json.data.Location !== "string") {
                    reject("Invalid JSON: " + xhr.responseText);
                    return;
                }

                resolve(json.data.Location);
                success(json.data.Location);
            };

            xhr.onerror = () => {
                reject({ message: "Video upload failed", remove: true });
                failure("Video upload failed");
            };

            xhr.send(formData);
        });
    };

    return (
        <div>
            <Editor
                apiKey={apiKey}
                // initialValue={content}
                value={content}
                init={{
                    selector: 'textarea',  // change this value according to your HTML
                    height: {height},
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
                    images_upload_handler: uploadImage,
                    images_upload_url: `${apiurl}/admin/blog/upload/image`,
                    automatic_uploads: true,
                    images_reuse_filename: true,
                    file_picker_callback: (callback, value, meta) => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        if (meta.filetype === 'image') {
                            input.setAttribute('accept', 'image/*');
                        } else if (meta.filetype === 'media') {
                            input.setAttribute('accept', 'video/*');
                        }
                        input.onchange = function () {
                            const file = this.files[0];
                            const reader = new FileReader();
                            reader.onload = function () {
                                const id = 'blobid' + (new Date()).getTime();
                                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                const base64 = reader.result.split(',')[1];
                                const blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);
                                if (meta.filetype === 'image') {
                                    uploadImage(blobInfo)
                                        .then((url) => {
                                            callback(url, { title: file.name });
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });
                                } else if (meta.filetype === 'media') {
                                    uploadVideo(blobInfo)
                                        .then((url) => {
                                            callback(url, { source: url, title: file.name });
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });
                                }
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    }
                }}
                onEditorChange={handleEditorChange}
            />
        </div>
    );
};

export default TinyEditor;
