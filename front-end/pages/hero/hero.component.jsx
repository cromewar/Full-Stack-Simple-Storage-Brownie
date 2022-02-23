import { ethers } from "ethers";
import { useState } from "react";

export const HeroComponent = (props) => {
  const address = props.rinkebyAddresss.toString();
  const abi = props.contractABI.abi;
  const [retrievedNumber, setRetreivedNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState(0);

  async function executeStore(_number) {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(address, abi, props.signer);
      try {
        await contract.store(_number);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please install Metamask");
    }
  }

  async function getNumber() {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(address, abi, props.signer);
      try {
        const number = await contract.retreive();
        setRetreivedNumber(number.toNumber());
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleChange = (e) => {
    setInputNumber(e.target.value);
  };

  return (
    <>
      <p>
        The Contract Deployed address is: {props.rinkebyAddresss} <br />
        view it on{" "}
        <a
          href="https://rinkeby.etherscan.io/address/0xf5063c7Be7d2ceDaCF7C822f4952A27A300B6C16"
          target="_blank"
        >
          EtherScan
        </a>
      </p>

      <div className="store-input">
        <div>
          <input
            type="number"
            onChange={handleChange}
            className="input is-focused"
          />
        </div>
        <div className="store-button">
          {props.isConnected ? (
            <button
              onClick={() => executeStore(inputNumber)}
              className="button is-link"
            >
              Store Number
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="store-input">
        <p className="number-retreived"> The number is {retrievedNumber}</p>
        {props.isConnected ? (
          <button onClick={() => getNumber()} className="button is-success">
            {" "}
            Get Number
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
