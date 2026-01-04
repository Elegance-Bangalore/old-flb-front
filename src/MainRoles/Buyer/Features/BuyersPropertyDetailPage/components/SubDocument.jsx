import Attachments from "./Attachments";
import React from "react";

const SubDocument = ({ singleProperty }) => {
  return (
    <>
      <section className="content-section" id="property-document">
        <div className="detail-content-box fl-property-card rounded-3">
          <div className="px-3 py-3 border-bottom fl-card-border">
            <h3 className="fl-text-dark text-uppercase mb-0">
              {singleProperty?.documentName?.name}
            </h3>
          </div>
          <div className="p-3 p-md-4 d-flex">
            <Attachments Documents={singleProperty?.documentFile} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SubDocument;
