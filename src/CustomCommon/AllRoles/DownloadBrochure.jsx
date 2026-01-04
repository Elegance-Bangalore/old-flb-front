import axios from 'axios';
import React, { useState } from 'react'

function DownloadBrochure({ singleProperty }) {
    const [downloadLoader, setDownloadLoader] = useState(false);
    const apiurl = import.meta.env.VITE_BASE_API_URL;

    async function handleDownload() {
        try {
            setDownloadLoader(true)
            const response = await axios.get(`${apiurl}/property/download/${singleProperty._id}`, {
                responseType: 'blob',
            });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'brochure.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        } finally {
            setDownloadLoader(false)
        }
    }

    return (
        <>
            <button
                className="fl-btn-green"
                onClick={handleDownload}
                disabled={downloadLoader}
            >
                {downloadLoader ? "Downloading..." : "Download Brochure"}

            </button>
        </>
    )
}

export default DownloadBrochure