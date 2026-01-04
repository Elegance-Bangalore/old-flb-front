import React from 'react'

function GeneralFaq() {
  return (
    <>
    <div className="accordion" id="accordionExample">
      <div className="card">
        <div id="headingOne">
          <button
            className="btn btn-link accordion-button collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="fasle"
            aria-controls="collapseOne"
          >
            Why do I need a verified account to use Farmland Bazaar services?
          </button>
        </div>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="card-body">
            <p className="ps-3 fw-bold m-0">
              At Farmland Bazaar our main aim is to eliminate brokers from the
              whole rental scene. In order to achieve that we verify each
              owner/tenant's account and activate it after verifying that the
              user is genuine.
            </p>
          </div>
        </div>
      </div>
      {/* End .card */}

      <div className="card">
        <div id="headingTwo">
          <button
            className="btn btn-link accordion-button collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="fasle"
            aria-controls="collapseTwo"
          >
            How long does it take for email verification?
          </button>
        </div>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse show"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="card-body">
            <p className="ps-3 fw-bold m-0">
              Email verification is very simple. As soon as you register you
              will receive a mail with a link to verify your email. It hardly
              takes a couple of minutes.
            </p>
          </div>
        </div>
      </div>
      {/* End .card */}

      <div className="card">
        <div id="headingThree">
          <button
            className="btn btn-link accordion-button collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            How long does it take for mobile number verification?
          </button>
        </div>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="card-body">
            <p className="ps-3 fw-bold m-0">
              Our CSR's work tirelessly to verify your account asap. Generally
              a mobile number verification happens in less than 4 hours.
            </p>
          </div>
        </div>
      </div>
      {/* End .card */}

      <div className="card">
        <div id="headingFour">
          <button
            className="btn btn-link accordion-button collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            How will I know if my account is verified?
          </button>
        </div>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div className="card-body">
            <p className="ps-3 fw-bold m-0">
              You will be notified about the account verification via email
              and sms.
            </p>
          </div>
        </div>
      </div>
      {/* End .card */}

      <div className="card">
        <div id="headingFive">
          <button
            className="btn btn-link accordion-button collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            Is it safe to use login via facebook & Google (social network)?
          </button>
        </div>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#accordionExample"
        >
          <div className="card-body">
            <p className="ps-3 fw-bold m-0">
              1. At Farmland Bazaar customer satisfaction is our main aim and
              we don't post anything on your social network for cheap
              publicity
              <br></br>
              <br></br>
              2. We don't ask for any extra information when you login with
              your social account
              <br></br>
              <br></br>
              3. If you use your social account, you will not have to remember
              one more cryptic password
              <br></br>
              <br></br>
              4. And Your email will be automatically verified
              <br></br>
              <br></br>
              5. If you are registering with social account, please make sure
              that your provide your mobile number at profile page after login
            </p>
          </div>
        </div>
      </div>
      {/* End .card */}
    </div>
  </>
  )
}

export default GeneralFaq