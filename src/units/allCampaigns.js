import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context";
import { getContractInstance } from "../utils/get-contract-instance";
import { trimAddress, trimDescription, trimTitle } from "../utils/helpers";

import "./styles.css";
import { ethers } from "ethers";
const CampaignsCard = ({
  index,
  creators,
  title,
  description,
  goal,
  deadlines,
  image,
  raisedAmounts,
  isComplete,
}) => {
  const { signer } = useContext(AppContext);
  const [tx, setTx] = useState("");
  const timestamp = deadlines * 1000;
  const date = new Date(timestamp);
  const normalDate = date.toLocaleString({ timeZone: "UTC" });

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.target);
      const donate = data.get("donate");
      console.log(donate, "form data");
      const contractInstance = getContractInstance(signer);
      const tx = await contractInstance.contribute(index, {
        value: ethers.utils.parseEther(donate),
      });
      setTx(tx);
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <>
      <div className="containe">
        <div className="img-div">
          <img src={image} alt="campaignmage" className="card-img" />
        </div>
        <div>
          <h2>{trimTitle(title)}</h2>
        </div>
        <div className="add-status">
          <div>
            <p>{trimAddress(creators)}</p>
          </div>
          <div>
            <p>Status: {isComplete ? "Complete" : "active"}</p>
          </div>
        </div>
        <div className="details">
          <div className="left">
            <div>{trimTitle(description)}</div>
            <div>Raised: {raisedAmounts}</div>
          </div>
          <div className="right">
            <div>Goal: {goal}</div>
            <div> {normalDate}</div>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form">
            <div>
              <input
                className="input"
                type="number"
                placeholder="Enter amount to donate"
                name="donate"
                required
              />
            </div>
            <div>
              <button className="submit-btn" type="submit">
                Donate Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CampaignsCard;
// https://cocky-minsky-fcbc8c.netlify.app/static/media/trekking.ef30f6fcd0fabb085bad.jpg
