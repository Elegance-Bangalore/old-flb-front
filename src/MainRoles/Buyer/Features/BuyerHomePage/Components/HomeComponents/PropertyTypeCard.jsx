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
      <div className="propCard d-flex  align-items-center gap-3">
        <div className="text-white ">Explore More :</div>
        <div className="">
          <Link to={`/property-list/?propertyType=${farmland}`}>
            <div className="explore-card ">
              <div className="">
                <img
                  className=" img-fluid"
                  src={explore1}
                  alt="explore"
                />
              </div>
              <h4 className="text-white">Farmland</h4>
            </div>
          </Link>
        </div>

        <div className="">
          <Link to={`/property-list/?propertyType=${farmhouse}`}>
            <div className="explore-card ">
              <div className="">
                <img className="img-fluid" src={explore2} alt="explore" />
              </div>
              <h4 className="text-white">Farmhouse</h4>
            </div>
          </Link>
        </div>

        <div className="">
          <Link to={`/property-list/?propertyType=${Estates}`}>
            <div className="explore-card ">
              <div className="">
                <img className="img-fluid" src={explore3} alt="explore" />
              </div>
              <h4 className="text-white">Estates</h4>
            </div>
          </Link>
        </div>

        <div className="">
          <Link to={`/property-list/?propertyType=${agricultureLand}`}>
            <div className="explore-card ">
              <div className="">
                <img className="img-fluid" src={explore4} alt="explore" />
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
