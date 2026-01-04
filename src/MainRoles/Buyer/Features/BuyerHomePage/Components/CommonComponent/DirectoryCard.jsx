import React from "react";
import { Link } from "react-router-dom";
import { generateDeveloperSlug } from "@/CustomServices/Constant";

const DirectoryCard = ({ groupBy, data, getSingleDeveloper }) => {
  const limitedData = data?.slice(0, 5);

  return (
    <>
      <div className="fl-card-shadow fl-bg-white p-2 h-100" >
        <div className="fl-bg-light-green py-2 px-3 border-raidus-10">
          <h3 className="fl-text-dark-green text-uppercase fl-fw-600 mb-0">
            {groupBy || "---"}
          </h3>
        </div>
        <div className="py-2 px-3">
          <ul className="mb-0">
            {limitedData?.map((element, index) => (
              <li className="my-2">
                <Link
                  to={`/developer/${generateDeveloperSlug(element?.companyName || element?.fullName)}/${element?._id}`}
                  className="fl-text-dark fl-fs-16 fl-text-green-hover"
                >
                  {element?.companyName || element?.fullName}
                </Link>
              </li>
            ))}

            {data.length > 5 ? (
              <li onClick={() => getSingleDeveloper(groupBy)}>
                <p
                  className="fl-text-dark fl-fs-16 fl-fw-600 fl-text-green-hover"
                  style={{ cursor: "pointer" }}
                >
                  More...
                </p>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DirectoryCard;
