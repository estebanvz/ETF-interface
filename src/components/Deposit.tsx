import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { connector } from "../configs/web3";
import { ethers } from "ethers";
import ABI_CONTRACT from "../configs/ETF.json";
function Deposit() {
  const APE_LP_CONTRACT = "0xd32f3139A214034A0f9777c87eE0a064c1FF6AE2"; // MATIC-DAI
  const APE_SWAPER = "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607";
  const APE_FARMER = "0x54aff400858Dcac39797a81894D9920f16972D1D"; // Address contract farmer ape farmer
  const BANANA_TOKEN = "0x5d47bAbA0d66083C52009271faF3F50DCc01023C";
  const DAI_TOKEN = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
  const CONTRACT = "0x10079037AC5535cA57167dfBE272e63dA8aee46F";

  const ABI_LP_CONTRACT = [
    "function name() view returns (string)",
    "function approve(address spender, uint amount) external returns (bool)",
    "function symbol() view returns (string)",
    "function gimmeSome() external",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
  ];

  const { activate, deactivate, account, chainId, active, library } =
    useWeb3React();
  const [token, settoken] = useState(0.0);
  const [contract, setContract] = useState(
    new ethers.Contract(
      CONTRACT,
      new ethers.utils.Interface(JSON.stringify(ABI_CONTRACT)),
      library
    )
  );
  const [deposited, setDeposited] = useState(0.0);
  const [lpContract, setlpContract] = useState(
    new ethers.Contract(
      APE_LP_CONTRACT,
      new ethers.utils.Interface(JSON.stringify(ABI_LP_CONTRACT)),
      library
    )
  );
  const ethereum = (window as any).ethereum;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const initContracts = () => {
    const signer = provider.getSigner(String(account));
    setContract(
      new ethers.Contract(
        CONTRACT,
        new ethers.utils.Interface(JSON.stringify(ABI_CONTRACT)),
        signer
      )
    );
    setlpContract(
      new ethers.Contract(
        APE_LP_CONTRACT,
        new ethers.utils.Interface(JSON.stringify(ABI_LP_CONTRACT)),
        signer
      )
    );
  };
  const getLiquidity = async () => {
    initContracts();
    console.log(lpContract);
    const tmp = await lpContract.balanceOf(account);
    console.log(tmp);
    settoken(tmp);
    setDeposited(await contract.totalSupplyToken());
  };
  const deposit = async () => {
    initContracts();
    const approve = await lpContract.approve(CONTRACT, token);
    const tmp = await contract.deposit(token);
  };
  const harvest = async () => {
    initContracts();
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const expiryDate = nowInSeconds + 900;
    const tmp = await contract.harvest(expiryDate, { gasLimit: 500000 });
  };
  const destroy = async () => {
    initContracts();
    const tmp = await contract.destroy();
  };
  const withdraw = async () => {
    initContracts();
    const shares = await contract.balanceOf(account);
    const shares2 = await contract.totalSupply();
    const shares3 = await contract.totalSupplyToken();
    const shares4 = await contract.totalSupplyRewards();
    console.log(String("-----------"));
    console.log("BALANCE: " + String(shares));
    console.log("tOTAL SUPPLY: " + String(shares2));
    console.log("tOTAL SUPPLY TOKEN: " + String(shares3));
    console.log("tOTAL SUPPLY REWARDS: " + String(shares4));
    const tmp = await contract.withdraw(shares, { gasLimit: 500000 });
  };
  return (
    <div className="App">
      <button
        className="p-2 m-2 shadow-sm border-2"
        onClick={() => {
          activate(connector);
        }}
      >
        Connect Metamask
      </button>
      <div>
        <div>Connection Status: {String(active)}</div>
        <div>Account: {account}</div>
        <div>Network: {chainId}</div>
      </div>
      <div>
        <button onClick={getLiquidity} className="p-2 m-2 shadow-sm border-2">
          Get (MATIC-DAI) Info
        </button>
        <br></br>
        <p className="inline-block mr-7">Wallet</p>
        <input
          value={token / 10 ** 18}
          disabled
          className="border-2 border-gray-400 m-2 p-1 rounded-md"
        ></input>
      </div>
      <div>
        <p className="inline-block">Deposited</p>
        <input
          value={deposited / 10 ** 18}
          disabled
          className="border-2 border-gray-400 m-2 p-1 rounded-md"
        ></input>
      </div>
      <div>
        <button onClick={deposit} className="p-2 m-2 shadow-sm border-2">
          Deposit
        </button>
        <button onClick={harvest} className="p-2 m-2 shadow-sm border-2">
          Harvest
        </button>
        <button onClick={withdraw} className="p-2 m-2 shadow-sm border-2">
          Withdraw
        </button>
        <button onClick={destroy} className="p-2 m-2 shadow-sm border-2">
          Destroy
        </button>
      </div>
    </div>
  );
}

export default Deposit;
