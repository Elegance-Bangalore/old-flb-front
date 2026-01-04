import { selectLoading } from "@/Redux/Chat/chatSlice";
import SearchUser from "./SearchUser";
import SingleUser from "./SingleUser";
import { useDispatch, useSelector } from "react-redux";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

const InboxUser = ({ search, setSearch, onUserClick }) => {
  const loading = useSelector(selectLoading)

  return (
    <div className="inbox_user_list">
      <div className="iu_heading">
        <div className="candidate_revew_search_box">
          <div className="form-inline d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="" type="button">
              <span className="flaticon-magnifying-glass"></span>
            </button>
          </div>
        </div>
      </div>
      {/* iu_heading */}

      <ul>
        {
          loading ? <OnClickLoader /> : <SingleUser onUserClick={onUserClick} />
        }

      </ul>
    </div>
  );
};

export default InboxUser;
