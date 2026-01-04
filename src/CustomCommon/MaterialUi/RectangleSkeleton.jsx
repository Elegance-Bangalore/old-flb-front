import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function RectangleSkeleton() {
    return (
        <div>
            <div className='row'>
                <div className='col-9'>
                    <Skeleton variant="rounded" className="w-100 mt-5" height={220} />
                </div>
                <div className='col-3'>
                    <Skeleton variant="rounded" className="w-100 mt-5" height={220} />
                </div>
            </div>

            <div className='row'>
                <div className='col-9'>
                    <Skeleton variant="rounded" className="w-100 mt-5" height={220} />
                </div>
                <div className='col-3'>
                    <Skeleton variant="rounded" className="w-100 mt-5" height={220} />
                </div>
            </div>
            <div className='row'>
                <div className='col-9'>
                    <Skeleton variant="rounded" className="w-100 mt-5" height={220} />
                </div>
                <div className='col-3'>
                    <Skeleton variant="rounded" className="w-100 mt-5" height={220} />
                </div>
            </div>
        </div>
    )
}

export default RectangleSkeleton    