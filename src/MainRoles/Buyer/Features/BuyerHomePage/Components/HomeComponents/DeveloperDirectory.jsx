import React, { useEffect, useState } from "react";
import BuyerHeader from "../../Layouts/BuyerHeader";
import DefaultMobileMenu from "../../Layouts/DefaultMobileMenu";
import BuyerFooter from "../../Layouts/BuyerFooter";
import { Link } from "react-router-dom";
import DirectoryCard from "../CommonComponent/DirectoryCard";
import { sellerDirectoryApi } from "@/ApiRoutes/BuyersApi";
import { object } from "yup";
import RightDrawer from "../CommonComponent/RightDrawer";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const number = "0-9";

const DeveloperDirectory = () => {
  const [directoryData, setDirectoryData] = useState([]);
  const [singleDeveloperData, setSingleDeveloperData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  async function developerDirectory() {
    try {
      const response = await sellerDirectoryApi(search);
      setDirectoryData(response?.data?.developers);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoader(false);
    }
  }

  function getSingleDeveloper(letter) {
    setSelectedLetter(letter);
    const data = directoryData[letter];
    setSingleDeveloperData(data);
    setOpen(true);
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      developerDirectory();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />

        <section className="fl-heading-banner">
          <div className="container fl-container">
            <h1 className="fl-banner-heading fl-text-dark-green">
              Developers in India
            </h1>
            <p className="fl-banner-heading-normal fl-text-dark-green fw-semi-bold">
              Let’s explore the best real estate companies in India and know
              more about them.
            </p>
          </div>
        </section>

        {loader ? (
          <div className="my-5 text-center">
            <OnClickLoader />
          </div>
        ) : (
          <section>
            <div className="container fl-container fl-mt-n-6">
              <div className="row pt-2 mb-5">
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      className="form-control rounded-4 py-3 fl-fs-18"
                      type="text"
                      placeholder="Search Developers"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container fl-container">
              <div className="fl-card-shadow fl-bg-white p-3 border-0">
                <h5 className="text-uppercase fl-fw-500 fl-text-dark mb-3">
                  List of Developers across India
                </h5>
                <ul className="d-flex justify-content-md-between align-items-center mb-0 flex-wrap">
                  {alphabet.map((letter) => (
                    <li key={letter} onClick={() => getSingleDeveloper(letter)} className="me-2">
                      <Link className="fl-text-green-hover">{letter}</Link>
                    </li>
                  ))}
                  <li onClick={() => getSingleDeveloper("0-9")} className="me-2">
                    <Link>{number}</Link>
                  </li>
                </ul>
              </div>

              <div className="row mt-4">
                {Object.keys(directoryData).map((developer, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <DirectoryCard
                      data={directoryData[developer]}
                      groupBy={developer}
                      getSingleDeveloper={getSingleDeveloper}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <BuyerFooter />
      </main>
      <RightDrawer
        open={open}
        setOpen={setOpen}
        singleDeveloperData={singleDeveloperData}
        selectedLetter={selectedLetter}
      />
    </>
  );
};

export default DeveloperDirectory;
