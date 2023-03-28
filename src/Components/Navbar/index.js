import React, { useState } from "react";
import LogoImg from "../../assets/LOGO2.png";
import "./styles.css";
import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ connectWallet }) => {
  const [wallet, setWallet] = useState("");
  const [signer, setSigner] = useState("");
  const [ethersProvider, setEthersProvider] = useState("");

  return (
    <>
      <div className="container">
        <div className="logo">
          <div>
            <img src={LogoImg} alt="logo" className="logo-img" />
          </div>
          <div>
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </div>
          <div>
            <Link to={"/CreateCampaign"} className="nav-link">
              Create Campaign
            </Link>
          </div>
        </div>
        <div className="walletBtn">
          {signer ? (
            <button className="btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <button className="btn">Connected</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
