import { DiscountCircle, Like1, MedalStar, People } from 'iconsax-react'
import React from 'react'

const WhyChooseSection = () => {
    const features = [
        {
            icon: MedalStar,
            title: "Experienced Team"
        },
        {
            icon: People,
            title: "User-Friendly Interface"
        },
        {
            icon: Like1,
            title: "Pay Zero Commission"
        },
        {
            icon: DiscountCircle,
            title: "Save Time and Money"
           
        }
    ]

    return (
        <>
            <section className="buyer-home-why-choose ">
                <div className="container fl-container">
                    <div className="row">
                        <div className="col-md-12 text-center mb-5">
                            <h2 className="fl-heading-2  mb-2">Why Choose Us?</h2>
                            <p className="fs-6">Discover what makes our platform the perfect choice for your needs</p>
                        </div>
                    </div>
                    
                    <div className="row g-4">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div key={index} className="col-sm-6 col-lg-3">
                                    <div className="why-choose-card ">
                                        <div className="icon-wrapper ">
                                            <IconComponent
                                                className="feature-icon "
                                                size="32"
                                                variant="Linear"
                                            />
                                        </div>
                                        <h4 className="card-title">{feature.title}</h4>
                                       
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyChooseSection