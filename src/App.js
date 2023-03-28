import Routers from "./routers/index";
import Web3modal from "web3modal";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import CreateCampaignForm from "./Components/createCampaign";
import { getContractInstance } from "./utils/get-contract-instance";
import { AppContext } from "./context";
import Navbar from "./Components/Navbar";

const App = () => {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState("");
  const [balance, setBalance] = useState("");
  const [ethersProvider, setEthersProvider] = useState("");

  const connectWallet = async () => {
    try {
      const web3modal = new Web3modal({
        providerOptions: {},
        cacheProvider: true,
      });

      const provider = await web3modal.connect();

      const ethersProvider = new ethers.providers.Web3Provider(provider, "any");

      const signer = ethersProvider.getSigner();
      console.log({ signer });
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setEthersProvider(ethersProvider);
      setSigner(signer);
      setAddress(address);
      setBalance(ethers.utils.formatEther(balance));
      console.log({ signer, address, balance }, "wallet details");
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    const isConnected = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
    if (isConnected) {
      connectWallet();
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ signer, ethersProvider, balance, address }}>
        <Routers connectWallet={connectWallet} />
      </AppContext.Provider>
    </>
  );
};
export default App;
