import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader() {
  const skeletons = Array.from({ length: 24 });

  return (
    <div className="row mt-5">
      {skeletons.map((_, index) => (
        <div key={index} className="col-12 col-md-6 my-3">
          <Skeleton variant="rectangular" height={320} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" className="w-50" />
          <Skeleton animation="wave" className="w-50 mb-3" />
          <Skeleton animation="wave" height={50} />
        </div>
      ))}
    </div>
  );
}
