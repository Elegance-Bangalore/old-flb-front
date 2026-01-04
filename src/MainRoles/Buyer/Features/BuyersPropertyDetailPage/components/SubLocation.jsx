import React, { useEffect } from 'react'
import FullScreenImage from './FullScreenImage'
import { useInView } from 'react-intersection-observer'

const SubLocation = ({ singleProperty, setActiveSection }) => {

    const [ref, inView, entry] = useInView({
        threshold: [0.5, 1],
        rootMargin: '-50px 0px -50px 0px',
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && entry.isIntersecting) {
            setActiveSection("location")
        }
    }, [inView, entry, setActiveSection]);


    return (
        < >
            <div className="content-section" id="location">
                <div className="detail-content-box fl-property-card rounded-3">
                    <div className="p-3 p-md-4">
                        {singleProperty?.layoutMap?.length > 0 &&
                            <div className="row mb-4">
                                <div className="col-12" ref={ref}>
                                    <div className="single-img-preview">
                                        <FullScreenImage imageUrl={singleProperty?.layoutMap[0]} />
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default SubLocation