import { ethers } from "ethers";
import abi from "../ABIs/Crowdfunding.json";

export const getContractInstance = (signer = null) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  return new ethers.Contract(
    "0x2036FFb876Fe1e660c68Aa3dB4a1C0b63907895A",
    abi,
    signer || provider
  );
};
