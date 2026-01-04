const Attachments = ({ Documents }) => {
  console.log("Documents", Documents);

  return (
    <>
      <div className="icon_box_area style2">
        <div className="score">
          <a
            className="flaticon-document text-thm fz30"
            download
            target="_blank"
            href={Documents?.Location}
          ></a>
        </div>
        <div className="details">
          <h5>
            <a download className="fw-bold" target="_blank">
              <a
                className=""
                target="_blank"
                download
                href={Documents?.Location}
              >
                <span className="flaticon-download text-thm pr10"></span>
              </a>
              {Documents?.key}
            </a>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Attachments;
