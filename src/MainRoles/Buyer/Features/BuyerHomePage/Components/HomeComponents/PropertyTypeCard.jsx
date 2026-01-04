import {
  agricultureLand,
  Estates,
  farmhouse,
  farmland,
} from "@/CustomServices/Constant";
import React from "react";
import { Link } from "react-router-dom";
import explore1 from "@/CustomAssets/BuyerImages/explore-1.png";
import explore2 from "@/CustomAssets/BuyerImages/explore-2.png";
import explore3 from "@/CustomAssets/BuyerImages/explore-3.png";
import explore4 from "@/CustomAssets/BuyerImages/explore-4.png";

function PropertyTypeCard() {
  return (
    <>
      <div className="row px-4 px-lg-5">
        <div className="col-6 col-lg-3">
          <Link to={`/property-list/?propertyType=${farmland}`}>
            <div className="explore-card mb-4 mb-lg-0">
              <div className="explore-img">
                <img
                  className="explore-img img-fluid w-100"
                  src={explore1}
                  alt="explore"
                />
              </div>
              <h4 className="text-white">Farmland</h4>
            </div>
          </Link>
        </div>

        <div className="col-6 col-lg-3">
          <Link to={`/property-list/?propertyType=${farmhouse}`}>
            <div className="explore-card mb-4 mb-lg-0">
              <div className="explore-img">
                <img className="img-fluid w-100" src={explore2} alt="explore" />
              </div>
              <h4 className="text-white">Farmhouse</h4>
            </div>
          </Link>
        </div>

        <div className="col-6 col-lg-3">
          <Link to={`/property-list/?propertyType=${Estates}`}>
            <div className="explore-card mb-4 mb-lg-0">
              <div className="explore-img">
                <img className="img-fluid w-100" src={explore3} alt="explore" />
              </div>
              <h4 className="text-white">Estates</h4>
            </div>
          </Link>
        </div>

        <div className="col-6 col-lg-3">
          <Link to={`/property-list/?propertyType=${agricultureLand}`}>
            <div className="explore-card mb-4 mb-lg-0">
              <div className="explore-img">
                <img className="img-fluid w-100" src={explore4} alt="explore" />
              </div>
              <h4 className="text-white">Agriculture Land</h4>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PropertyTypeCard;
