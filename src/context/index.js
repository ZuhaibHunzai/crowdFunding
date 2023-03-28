import React from "react";

export const AppContext = React.createContext({
  signer: "",
  ethersProvider: "",
  balance: "",
  address: "",
  setSigner: () => {},
  setEthersProvider: () => {},
  setBalance: () => {},
  setAddress: () => {},
});
