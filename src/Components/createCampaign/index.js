import { useContext, useRef } from "react";
import "./styles.css";
import { trimAddress } from "../../utils/helpers";
import { getContractInstance } from "../../utils/get-contract-instance";
import { AppContext } from "../../context";
import { ethers } from "ethers";

export const CreateCampaign = () => {
  const { signer, balance, address } = useContext(AppContext);
  console.log(signer, "signer");
  const deadlineInput = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.target);
      const title = data.get("title");
      const description = data.get("description");
      const goal_ = data.get("goal");
      const goal = ethers.utils.parseEther(goal_.toString());
      const image = data.get("image");
      const deadline = new Date(deadlineInput.current.value).getTime() / 1000;
      console.log(title, description, goal, image, "form data");
      const contractInstance = getContractInstance(signer);

      const tx = await contractInstance.createCampaign(
        title,
        description,
        goal,
        deadline,
        image
      );
      await tx.wait();

      console.log("done");
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      <div className="main">
        <div className="wallet">
          <div className="wallet-balance">
            {signer ? (
              <p className="wallet-details">
                Wallet Address: {trimAddress(address)}
              </p>
            ) : (
              <p className="wallet-details">
                Wallet Address:__________________
              </p>
            )}
          </div>
          <div className="wallet-balance">
            {signer ? (
              <p className="wallet-details">Wallet Balance: {balance}</p>
            ) : (
              <p className="wallet-details">
                Wallet Balance:__________________
              </p>
            )}
          </div>
        </div>
        <div className="heading">
          <h1 className="heading-text">Create New Campaign</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="campaigns-form">
            <div className="form left">
              <div>
                <input
                  name="title"
                  type="text"
                  className="inputs"
                  placeholder="Enter title"
                ></input>
              </div>
              <div>
                <input
                  name="goal"
                  type="number"
                  id="goal"
                  step="any"
                  className="inputs"
                  placeholder="Enter goal in ETH"
                ></input>
              </div>
              <div>
                <input
                  ref={deadlineInput}
                  name="dedaline"
                  type="date"
                  className="inputs"
                ></input>
              </div>
              <div>
                <input
                  name="image"
                  type="text"
                  className="inputs"
                  placeholder="Place image URL of your campaign"
                ></input>
              </div>
            </div>
            <div className="form right">
              <div className="form left">
                <textarea
                  name="description"
                  className="description"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Create campaigns
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateCampaign;
