import { DiscountCircle, Like1, MedalStar, People } from 'iconsax-react'
import React from 'react'

const WhyChooseSection = () => {
    return (
        < >
            <section className="fl-bg-green py-5 buyer-home-why-choose">
                <div className="container fl-container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h2 className="fl-heading-2 text-white">Why Choose Us?</h2>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-sm-6 col-xl-3 mb-2 mb-md-4 mb-xl-0">
                                    <div className="d-flex gap-3 align-items-center">
                                        <MedalStar
                                            className="text-white"
                                            size="60"
                                            variant="Bulk"
                                        />
                                        <h3 className="text-white fl-ff-main fw-semi-bold">
                                            Experienced Team
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-3 mb-2 mb-md-4 mb-xl-0">
                                    <div className="d-flex gap-3 align-items-center">
                                        <People className="text-white" size="60" variant="Bulk" />
                                        <h3 className="text-white fl-ff-main fw-semi-bold">
                                            User-Friendly Interface
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-3 mb-2 mb-md-4 mb-xl-0">
                                    <div className="d-flex gap-3 align-items-center">
                                        <Like1 className="text-white" size="60" variant="Bulk" />
                                        <h3 className="text-white fl-ff-main fw-semi-bold">
                                            Pay Zero Commission
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-3 mb-2 mb-md-4 mb-xl-0">
                                    <div className="d-flex gap-3 align-items-center">
                                        <DiscountCircle
                                            className="text-white"
                                            size="60"
                                            variant="Bulk"
                                        />
                                        <h3 className="text-white fl-ff-main fw-semi-bold">
                                            Save Time and Money
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyChooseSection