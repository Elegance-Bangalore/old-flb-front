import React from 'react'
import Skeleton from "@mui/material/Skeleton";
import RectangleSkeleton from './RectangleSkeleton';
import HomePageCardLoader from './HomepageCardLoader';

function CategoryLoader() {
    return (
        <div className='my-5'>
            <div className='container fl-container'>
                <div className='d-flex justify-content-center'>
                    <Skeleton variant="rounded"  height={150} className='w-50' />
                </div>
                <div>
                    <HomePageCardLoader />
                </div>
            </div>
        </div>

    )
}

export default CategoryLoader