import Item from '../components/item.js';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from "react";

import {MarketplaceAddress} from '../config.js';
import MarketAbi from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
const ethers = require("ethers");


const Buyer = () => {

    const [title, setTitle] = useState("");
    const [buyerAddress, setBuyerAddress] = useState("");
    const [items, setItems] = useState([]);
    const [supplierAddress, setSupplierAddress] = useState("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

    const checkWallet = async () => {
        try{
            const { ethereum } =  window;
            if(!ethereum){
                console.log("Metamask not detected");
                return;
            }
            console.log("Metamask connected");
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setBuyerAddress(accounts[0]);
            console.log("Buyer account ", accounts[0]);
        } catch (err) {
            console.log("Error connecting to metamask ", err);
        }
    }

    const getBuyerItems = async (e) => {
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
                const isBuyer = await MarketContract.bBuyer();
                console.log("isBuyer = ", isBuyer);
                if(!isBuyer){
                    console.log("you are still not a buyer, please become a buyer!!!");
                    setItems([]);
                    return;
                }
                const arr = await MarketContract.getItems(buyerAddress);
                setItems(arr);
                //
            }
        } catch (error){
            console.log("Get Buyer Items error: ", error);
        }
    }

    const buyItem = async (e) => {
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

                const isBuyer = await MarketContract.bBuyer();
                if(!isBuyer){
                    await MarketContract.becomeBuyer();
                }

                MarketContract.buyItem(supplierAddress, title)
                    .then(response => {
                        console.log("Bought an item");
                        getBuyerItems();
                    });
            }
        } catch (error){
            console.log("Get Buyer Items error: ", error);
        }
    }

    useEffect(() => {
        checkWallet();
        getBuyerItems();
    }, []);

    return (
        <>
            <div className="main-component">
                <h1 className="title">Buyer</h1>
                <div className='flex flex-row gap-6'>
                    <div>
                        <h3>Held Items</h3>
                        {
                            items.map((item, index) => <Item key={index} title={item.name}  />)
                            // items.map((item, index) => <Item key={index} title={item.name} quantity={item.quantity} />)
                        }
                    </div>
                    <div className="flex flex-row gap-3 mt-7">
                        <div className="flex flex-column gap-2">
                            <InputText value={supplierAddress} onChange={(e) => setSupplierAddress(e.target.value)}/>
                            <InputText value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <Button label="Buy" onClick={() => buyItem()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Buyer;