import React from 'react'
import call from "@/public/assets/images/profile/call-calling.svg";
import sms from "@/public/assets/images/profile/sms-edit.svg";
import adds from "@/public/assets/images/profile/promotional-banners.png";
import { Link } from 'react-router-dom';

function Support() {
    return (
        <>
            <div className="support-detail bg-white-shadow text-start mb-4">
                <div className="p-4">
                    <h3 className="text-uppercase mb-4">Support</h3>
                    <div className="contact-info">
                        <span className="contact-icon">
                            <img className="img-fluid" src={call} alt="call" />
                        </span>
                        <div className="contact-detail">
                            <h5>Call Us</h5>
                            <h6>
                                {" "}
                                <a href="tel:+91 7075807123">+91 7075807123</a>{" "}
                            </h6>
                        </div>
                    </div>
                    <div className="contact-info">
                        <span className="contact-icon">
                            <img className="img-fluid" src={sms} alt="sms" />
                        </span>
                        <div className="contact-detail">
                            <h5>Email Us</h5>
                            <h6>
                                <a href="mailto:info@farmlandbazaar.com">info@farmlandbazaar.com</a>
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="other-detail p-4 border-top">
                    <h3 className="text-uppercase">Have Questions?</h3>
                    <p>Explore our FAQ section for commonly asked questions</p>
                    <Link to="/faq">
                        <button className="btn btn-dark px-4 mt-3">
                            Explore FAQ’s
                        </button>
                    </Link>

                </div>
            </div>
            <div className="card-shadow adds-imgs">
                <img className="img-fluid w-100" src={adds} alt="add" />
            </div>
        </>
    )
}

export default Support