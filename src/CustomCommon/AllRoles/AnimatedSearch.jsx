import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

function AnimatedSearch() {
  const placeholders = [
    "'Managed Farms near Hyderabad'",
    "'Farmland with Clubhouse'",
    "'Gated Farmland in Bangalore'",
    "'2 BHK farmhouse near Mumbai'",
    "'Estates near me'",
    "'10 bigha Agricultural Land near Chennai'",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mobile-serach">
        <TransitionGroup component={null}>
          {
            <CSSTransition
              key={placeholderIndex}
              classNames="placeholder-slide"
              timeout={100}
            >
              <span
                className="placeholder-text"
                style={{ fontSize: "12px", zIndex: 999, left: "30px" }}
              >
                {placeholders[placeholderIndex]}
              </span>
            </CSSTransition>
          }
        </TransitionGroup>
        <Link to="/search" className="mobile-search-input-wrapper">
          <input
            className="mobile-search-input"
            type="text"
            name=""
            id=""
            // placeholder="Search by location, property type"
          />
          <span className="mobile-search-icon">
            <SearchIcon size={40} />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default AnimatedSearch;
