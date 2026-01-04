import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
export default function HomePageCardLoader() {
    return (
        <div className="row mt-5">
            <div className="col-4">
                <Skeleton variant="rectangular" height={280} className="mb-3" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" className="w-50" />
                <Skeleton animation="wave" className="w-50 mb-3" />
            </div>
            <div className="col-4">
                <Skeleton variant="rectangular" height={280} className="mb-3" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" className="w-50" />
                <Skeleton animation="wave" className="w-50 mb-3" />
            </div>
            <div className="col-4">
                <Skeleton variant="rectangular" height={280} className="mb-3" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" className="w-50" />
                <Skeleton animation="wave" className="w-50 mb-3" />
            </div>
        </div>

    );
}
