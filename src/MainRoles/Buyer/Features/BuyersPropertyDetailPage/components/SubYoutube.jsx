import React from "react";

const getEmbedUrl = (url) => {
  const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]{11})(?:[?&]t=(\d+))?/);
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  return url; // Return original if no match, though it will likely fail
};

const SubYoutube = ({ singleProperty }) => {
  return (
    <>
      {singleProperty?.videoUrl?.length && (
        <section className="content-section">
          <div className="detail-content-box fl-property-card rounded-3">
            <div className="px-3 py-3 border-bottom fl-card-border">
              <h3 className="fl-text-dark text-uppercase mb-0">
                Youtube Video
              </h3>
            </div>
            <div className="p-3 p-md-4">
              <div className="row">
                <div className="col-md-12">
                  <iframe
                    width="100%"
                    height="500"
                    src={getEmbedUrl(singleProperty?.videoUrl[0])}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SubYoutube;
