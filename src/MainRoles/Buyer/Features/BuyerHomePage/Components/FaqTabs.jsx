import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DOMPurify from "dompurify";

function FaqTabs({ faqData }) {
  const [expanded, setExpanded] = useState(null);

  const handleChangeAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <>
      {faqData?.map((element, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleChangeAccordian(`panel${index}`)}
          defaultExpanded
          sx={{ boxShadow: "unset" }}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              border : "1px solid #eeeeee",
            }}
          >
            <p className="m-0 pe-4 fw-bold">{element?.question}</p>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "1rem",
              borderfRadius: "8px",
              boxShadow:
                "0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(element.answers),
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default FaqTabs;
