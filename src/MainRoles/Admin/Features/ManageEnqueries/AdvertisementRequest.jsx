import { advertisementListApi } from "@/ApiRoutes/AdminApi";
import React, { useEffect, useState } from "react";
import AdvertisementTable from "./AdvertisementTable";

function AdvertisementRequest() {


  return (
    <div>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Advertisement Request</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-12">
                <AdvertisementTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertisementRequest;
