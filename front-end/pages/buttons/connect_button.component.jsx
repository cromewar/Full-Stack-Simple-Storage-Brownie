import { ethers } from "ethers";

export const ConnectButton = (props) => {
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        props.setIsConnected(true);
        let connectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        props.setSigner(connectedProvider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      props.setIsConnected(false);
    }
  }

  return (
    <>
      {props.isConnected ? (
        "Connected!"
      ) : (
        <button onClick={() => connect()} className="button is-primary">
          Connect Wallet
        </button>
      )}
    </>
  );
};
