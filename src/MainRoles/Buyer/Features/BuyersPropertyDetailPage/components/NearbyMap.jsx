import React, { useEffect, useState } from 'react'

function NearbyMap({ nearbyData }) {

    const [selectedLocation, setSelectedLocation] = useState(nearbyData ? nearbyData[0] : null);


    useEffect(() => {
        if (nearbyData?.length > 0) {
            setSelectedLocation(nearbyData[0]);
        }
    }, [nearbyData]);


    return (
        <div className="row">
            <div className="col-md-8">
                <iframe
                    src={selectedLocation?.embeddedMapUrl}
                    width="100%"
                    height="100%"
                    allowFullscreen=""
                    style={{ minHeight : '400px' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="col-md-4" style={{ maxHeight: "400px", overflow: "auto" }}>
                {
                    nearbyData?.slice(0, 5).map((item, index) => (
                        <div className="fl-property-card border-raidus-10 mb-4 px-3 py-2" style={{ backgroundColor: item === selectedLocation ? '#16A08524' : "", cursor: "pointer" }} onClick={() => setSelectedLocation(item)}>
                            <h4 className='fl-fw-600'>{item.name}</h4>
                            <div className="d-flex gap-3">
                                <p className='mb-0'><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 7.5V4.25C2 3.00736 3.00736 2 4.25 2C5.49265 2 6.5 3.00736 6.5 4.25V7.75C6.5 8.44035 7.05965 9 7.75 9C8.44035 9 9 8.44035 9 7.75V4.41465C8.4174 4.20873 8 3.65311 8 3C8 2.17158 8.67155 1.5 9.5 1.5C10.3285 1.5 11 2.17158 11 3C11 3.65311 10.5826 4.20873 10 4.41465V7.75C10 8.99265 8.99265 10 7.75 10C6.50735 10 5.5 8.99265 5.5 7.75V4.25C5.5 3.55964 4.94035 3 4.25 3C3.55964 3 3 3.55964 3 4.25V7.5H4.5L2.5 10L0.5 7.5H2ZM9.5 3.5C9.77615 3.5 10 3.27614 10 3C10 2.72386 9.77615 2.5 9.5 2.5C9.22385 2.5 9 2.72386 9 3C9 3.27614 9.22385 3.5 9.5 3.5Z" fill="#16A085" />
                                </svg></span>{" "}{item?.distance}</p> <p className='mb-0'><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M8.47485 7.97485C9.8417 6.60805 9.8417 4.39196 8.47485 3.02513C7.10805 1.65829 4.89196 1.65829 3.52513 3.02513C2.15829 4.39196 2.15829 6.60805 3.52513 7.97485L6 10.4497L8.47485 7.97485ZM6 11.8639L2.81802 8.682C1.06066 6.9246 1.06066 4.07538 2.81802 2.31802C4.57538 0.56066 7.4246 0.56066 9.182 2.31802C10.9394 4.07538 10.9394 6.9246 9.182 8.682L6 11.8639ZM6.5 5.5H8.5V6.5H5.5V3H6.5V5.5Z" fill="#16A085" />
                                </svg></span>{" "}{item?.duration}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default NearbyMap