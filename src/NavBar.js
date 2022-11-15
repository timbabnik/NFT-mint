import React from 'react'
import './App.css';

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccounts() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div className="nav">
            

            {isConnected ? (
                <p style={{color: "white", fontSize: 20, marginTop: 20}}></p>
            ) : (
                <button onClick={connectAccounts} style={{backgroundColor: "red", height: 50, width: 130, borderRadius: 10, color: "white", fontSize: 15}}>Connect</button>
            )}
        </div>
    )
};

export default NavBar;