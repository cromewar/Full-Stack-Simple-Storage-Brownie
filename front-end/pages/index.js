import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import "bulma/css/bulma.min.css";
import { NavBar } from "./navbar/navbar.component";
import { HeroComponent } from "./hero/hero.component";

export default function Home() {
  //Getting the contract addresses
  let addresses = require("./chain-info/deployments/map.json");
  // getting the contract address for rinkeby
  let rinkebyAddresss = addresses[4]["SimpleStorage"];
  // getting the ABI
  let contractABI = require("./chain-info/deployments/4/0xf5063c7Be7d2ceDaCF7C822f4952A27A300B6C16.json");

  // Use the state for connection
  const [isConnected, setIsConnected] = useState(false);
  // Provider
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState(undefined);

  // Function to execute a smart contract function
  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const address = rinkebyAddresss.toString();
      const abi = contractABI.abi;
      const contract = new ethers.Contract(address, abi, signer);
      try {
        await contract.store(7);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please install Metamask");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <NavBar
          setIsConnected={setIsConnected}
          setSigner={setSigner}
          isConnected={isConnected}
        />
        <HeroComponent
          rinkebyAddresss={rinkebyAddresss}
          isConnected={isConnected}
          contractABI={contractABI}
          signer={signer}
        />
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Code made by <strong>Cromewar</strong>
          </p>
        </div>
      </footer>
    </>
  );
}
