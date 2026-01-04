import React from 'react'
import Modal from 'react-bootstrap/Modal';
import subscriptionImage from '../../CustomAssets/Admin/subscribe.png';
import { Link } from 'react-router-dom';


function SubscriptionModal({ show, handleClose }) {
    return (
        <div>
            <Modal className="custom-modal-sub" show={show} onHide={handleClose} centered>
                <div className='custom-modal-header'>
                </div>
                <div className="custom-modal-content">
                    <div className="text-center mb-5">
                        <div className="mb-3 custom-modal-img">
                            <img className='img-fluid' src={subscriptionImage} alt="subscription-Image" />
                        </div>
                        <h2 className='fl-ff-main fl-text-dark'>Get a Subscription!</h2>
                        <p className='fl-fs-18 fl-text-dark lh-base'>You Have to buy Subscription first</p>
                    </div>
                    <div className='d-flex justify-content-center gap-3'>
                        <button className='w-100 modal-btn-dark text-uppercase fw-bold' onClick={handleClose}>
                            CANCEL
                        </button>
                        
                            <button className='w-100 modal-btn-green text-uppercase fw-bold'>
                            <Link className='text-white' to="/subscription-plan">   SUBSCRIBE NOW  </Link>
                            </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SubscriptionModal