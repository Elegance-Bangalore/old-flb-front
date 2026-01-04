import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

function LocationMap({ singleProperty, setActiveSection }) {

  const [ref, inView, entry] = useInView({
    threshold: [0.5, 1],
    rootMargin: '-50px 0px -50px 0px',
    triggerOnce: false,
});

useEffect(() => {
    if (inView && entry.isIntersecting) {
        setActiveSection("location")
    }
}, [inView, entry, setActiveSection]);

  const renderMapIframe = (map) => {
    if (map.startsWith("http")) {
      // Plain URL
      return (
        <iframe
          src={map}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      );
    } else {
      const googleMapsEmbedRegex = /<iframe.*?src="(https:\/\/www\.google\.com\/maps\/embed\?[^"]+)".*?><\/iframe>/;
      const match = map.match(googleMapsEmbedRegex);
      if (match) {
        const src = match[1];
        return (
          <iframe
            src={src}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        );
      }
    }
    return null;
  };


  return (
    <>
      {singleProperty?.map && (
        <div>
          <section className="content-section pb-0" id="location">
            <div className="detail-content-box fl-property-card rounded-3">
              <div className="px-3 py-3 border-bottom fl-card-border">
                <h3 className="fl-text-dark text-uppercase mb-0">LOCATION MAP</h3>
              </div>
              <div className="p-4" ref={ref}>
                <div className="row">
                  {renderMapIframe(singleProperty?.map)}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>


  )
}

export default LocationMap