import Item from '../components/item.js';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from "react";

import {MarketplaceAddress} from '../config.js';
import MarketAbi from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
const ethers = require("ethers");

const Items = () => {
    
    const [items, setItems] = useState([]);
    const [myAddress, setMyAddress] = useState("");


    const checkWallet = async () => {
        try{
            const {ethereum} = window;
            if(!ethereum){
                console.log("Metamask not detected");
                return;
            }
            console.log("Metamask connected");
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setMyAddress(accounts[0]);
            console.log("Found account ", accounts[0]);

        } catch (err) {
            console.log("Error connecting to metamask ", err);
        }
    }

    const getAllItems = async () => {
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const MarketContract = new ethers.Contract(
                    MarketplaceAddress,
                    MarketAbi.abi,
                    signer
                );
                console.log("getting all items ...");
                let arr = await MarketContract.getAllItems();
                // let arr = await MarketContract.getInventory("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
                console.log("items => ", arr);
                setItems(arr);
                // setTimeout(() => {
                // }, 10000);
            }
        } catch ( error) {
            console.log("Get All Items Error \n ", error);
        }
    }

    const init = async () => {
        // await checkWallet();
        await getAllItems();
    }

    useEffect(() => { 
       init();
    } , []);

    return (
        <>  
            <div className="main-component">
                <h1 className="title">Items</h1>
                {
                    items.map((item, index) => <Item key={index} title={item.name} quantity={parseInt(item.quantity, 16)} />)
                }
            </div>

            
        </>
    )
}

export default Items;