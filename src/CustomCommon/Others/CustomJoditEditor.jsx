import JoditEditor from "jodit-react";
import React, { useRef } from "react";

function CustomJoditEditor({ content, setFieldValue, name }) {
  const editor = useRef(null);

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
    setFieldValue(name, sanitizedContent);
  };

  return (
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
            const clipboardData = event.clipboardData || window.clipboardData;
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
  );
}

export default CustomJoditEditor;
