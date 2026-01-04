const FaqContent = ({search}) => {

  const faqList = [
    {
      question: "Why do I need a verified account to use Farmland Bazaar services?",
      answer:
        "At Farmland Bazaar our main aim is to eliminate brokers from the whole rental scene. In order to achieve that we verify each owner/tenant's account and activate it after verifying that the user is genuine.",
    },
    {
      question: "How long does it take for email verification?",
      answer:
        "Email verification is very simple. As soon as you register you will receive a mail with a link to verify your email. It hardly takes a couple of minutes.",
    },
    {
      question: "How long does it take for mobile number verification?",
      answer:
        "Our CSR's work tirelessly to verify your account asap. Generally a mobile number verification happens in less than 4 hours.",
    },
    {
      question: "How will I know if my account is verified?",
      answer: "You will be notified about the account verification via email and sms.",
    },
    {
      question: "Is it safe to use login via facebook & Google (social network)?",
      answer:
        "1. At Farmland Bazaar customer satisfaction is our main aim and we don't post anything on your social network for cheap publicity\n2. We don't ask for any extra information when you login with your social account\n3. If you use your social account, you will not have to remember one more cryptic password\n4. And Your email will be automatically verified\n5. If you are registering with social account, please make sure that your provide your mobile number at profile page after login",
    },
  ];

  const filteredFaqList = faqList.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="accordion" id="accordionExample">
        {filteredFaqList.map((faq, index) => (
          <div className="card" key={index}>
            <div id={`heading${index}`}>
              <button
                className="btn btn-link accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </div>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="card-body">
                <p className="ps-3 fw-bold m-0">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FaqContent;
