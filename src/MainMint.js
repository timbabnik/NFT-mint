import { useState } from "react";
import { ethers, BigNumber} from "ethers";
import nftMint from "./TimoNft.json";
import './index.css';

const address = "0x73Bf16b62595eDA0Ff7c4f4EC8067949fdEDDF8D";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                address,
                nftMint.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log("response: ", response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div>
            

            {isConnected ? (
                <div>
                    <h1 style={{fontSize: 80, fontWeight: "bold", color: "white"}}>LIMITED SALE</h1>
            <div className="flex items-end justify-between p-3 rounded-md border border-white mt-10">
                <div className="h-32 w-32 bg-red-500 rounded-md flex justify-center items-end">
                    <img src="https://i.postimg.cc/zX2tY8tf/undraw-Ready-for-waves-vlke-removebg-preview.png" className="h-32" /> 
                </div>
                <div className="items-end flex flex-col">
                    <p className="text-white">Price Per NFT</p>
                    <p className="text-white text-2xl">0.10 ETH Each</p>
                </div>
            </div>
            <div className="flex justify-between items-center border-white border mt-8 rounded-md p-3 bg-gray-800">
                <div className="flex">
                    <p onClick={handleDecrement} className="text-white mx-3 text-3xl hover:cursor-pointer">-</p>
                    <p className="text-white mx-3 text-3xl">{mintAmount}</p>
                    <p onClick={handleIncrement} className="text-white mx-3 text-3xl hover:cursor-pointer">+</p>
                </div>
                <div className="text-black text-md bg-white p-2 px-5 rounded-md">SET MAX</div>
            </div>
            <div className="mt-8 justify-between flex p-5 border-white border-t border-b">
                <p className="text-white">Total</p>
                <p className="text-white">0.10 ETH</p>
            </div>
            <div onClick={handleMint} className="text-black text-xl mt-10 bg-yellow-500 py-5 rounded-md ">Mint</div>
                </div>
            ) : (
                <p style={{color: "white", fontSize: 30, fontWeight: "lighter"}}>You must be connected to MINT.</p>
            )}
        </div>
    );
};

export default MainMint;