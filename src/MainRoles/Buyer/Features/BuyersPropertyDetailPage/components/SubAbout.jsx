import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const SubAbout = ({ singleProperty, setActiveSection }) => {

    const [ref, inView, entry] = useInView({
        threshold: [1],
        rootMargin: '-50px 0px -50px 0px',
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && entry.isIntersecting) {
            setActiveSection("about")
        }
    }, [inView, entry, setActiveSection]);

    return (
        < >
            <section className="pb-0" id="about" >
                <div className="detail-content-box fl-property-card rounded-3">
                    <div className=" px-3 py-3 border-bottom fl-card-border">
                        <h3 className="fl-text-dark text-uppercase mb-0">About</h3>
                    </div>
                    <div className="p-3 p-md-4">
                        <div
                            className="fl-text-dark fl-fs-18"
                            ref={ref}
                            dangerouslySetInnerHTML={{ __html: singleProperty?.propertyDescription }}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SubAbout