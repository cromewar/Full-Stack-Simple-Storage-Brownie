import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";

export default function Home() {
  // Use the state for connection
  const [isConnected, setIsConnected] = useState(false);
  // Provider
  const [provider, setProvider] = useState();

  // Function to connect to metamask
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        let connectedProvider = new ethers.proviers.Web3Provier(
          window.ethereum
        );
        setSigner(connectedProvider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  // Function to execute a smart contract function

  return (
    <div className={styles.container}>
      <button onClick={() => connect()}>
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </button>
    </div>
  );
}
