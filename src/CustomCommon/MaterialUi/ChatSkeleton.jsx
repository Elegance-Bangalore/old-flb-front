import Skeleton from "@mui/material/Skeleton";

import React from 'react'

function ChatSkeleton() {
    return (
        <div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="text-start w-100 d-flex gap-1 align-items-center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
            </div>
            <div className="d-flex justify-content-end gap-1 w-100 align-items-center">
                <Skeleton animation="wave" variant="rounded"  borderRadius={40}  width={150} height={50} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
        </div>
    )
}

export default ChatSkeleton