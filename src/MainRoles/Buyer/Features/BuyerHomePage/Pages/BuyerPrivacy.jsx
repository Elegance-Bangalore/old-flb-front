import React from 'react'
import BuyerHeader from '../Layouts/BuyerHeader'
import BuyerFooter from '../Layouts/BuyerFooter'
import aboutImage from "../../../../../CustomAssets/BuyerImages/about.png"
import DefaultMobileMenu from '../Layouts/DefaultMobileMenu'
const BuyerPrivacy = () => {
    return (
        < >
            <main className="buyers-main">
                <BuyerHeader headerHide={true} />
                <DefaultMobileMenu />
                <section className='fl-about-banner-hero'>
                    <div className="container fl-container">
                        <h1 className='text-white fl-banner-heading'>Privacy Policy</h1>
                    </div>
                </section>
                <section>
                    <div className="container fl-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="">
                                    <h2 className='fl-text-dark mb-4 fl-heading-2'>
                                        farmlandbazaar.com website is owned and managed by Farmland Bazaar Pvt. Ltd.
                                        Farmland Bazaar Pvt. Ltd. respects Privacy of its users and hence follows this Privacy statement.
                                    </h2>
                                    <ol className='text-dark fl-fs-20 fl-text-justify mb-4 ps-4' style={{ listStyle: "auto" }}>
                                        <li className='mb-4'>We use IP address to analyze problem with our server and manage our website. We may also use your IP address to gather demographic information.</li>
                                        <li className='mb-4'>farmlandbazaar.com contains pnks to other websites, which have their own Privacy practices and content. We are not responsible for such websites.</li>
                                        <li className='mb-4'>To enhance user experience and improve site experience, we use cookies to collect information to understand user interests and history using identified computer.</li>
                                        <li className='mb-4'>We may use third party Ad Company to display ads on our website (e.g. Ad sense). These ads may contain cookies. Cookies received with banner ads are collected by ad company and are beyond our control.</li>
                                        <li className='mb-4'>Some of our websites may invite you to contact us or to provide information about yourself. We use the information you provide to personapze your onpne experience and to depver the content most suited to your needs.</li>
                                        <li className='mb-4'>Verifiable information is collected from users or the registered members of farmlandbazaar.com such as contact person name, email address, maipng address, phone number, user password, etc.</li>
                                        <li className='mb-4'>farmlandbazaar.com does not sell or trade your personal information.</li>
                                        <li className='mb-4'>farmlandbazaar.com may tie-up with certified partners to provide related services to you.  We might share your personal information with your consent to ensure better and more relevant services. We advise you to review the Privacy Policy of partner for questions regarding the use of your personal information.</li>
                                        <li className='mb-4'>If we change our Privacy Policy, we will post about those changes on the website.</li>
                                        <li className='mb-4'>Our use of your information will be consistent with the Policy under which the information was collected. If we decide to use your personal information in a different manner, we will notify you via email. You can decide whether we can use your information in this new manner or not and we will act accordingly.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <BuyerFooter />
            </main>
        </>
    )
}

export default BuyerPrivacy