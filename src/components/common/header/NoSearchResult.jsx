import React from 'react'
import search from "../../../CustomAssets/BuyerImages/searchresult.png"

function NoSearchResult() {
    return (
        <>
            <div className='mt-5 d-flex align-items-center justify-content-center'>
                <img width="40%" src={search}></img>
            </div>
        </>
    )
}

export default NoSearchResult