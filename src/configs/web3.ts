import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

const connector = new InjectedConnector({
  supportedChainIds: [
    137, // Polygon
  ],
});

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};
export { connector, getLibrary };
