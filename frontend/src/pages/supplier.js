import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Item from '../components/item.js';       

import {MarketplaceAddress} from '../config.js';
import MarketAbi from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
const ethers = require("ethers");

const Supplier = () => {

    const [newTitle, setNewTitle] = useState("");
    const [oldTitle, setOldTitle] = useState("");
    const [show, setShow] = useState(false);
    const [myAddress, setMyAddress] = useState("");
    const [items, setItems] = useState([]);

    const checkWallet = async () => {
        try{
            const { ethereum } =  window;
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
            if(ethereum && show === false){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const MarketContract = new ethers.Contract(
                    MarketplaceAddress,
                    MarketAbi.abi,
                    signer
                );
                console.log("getting inventory ...");
                let arr = await MarketContract.getInventory(myAddress);
                console.log("Inventories => ", arr);
                setItems(arr);
            }
            setShow(!show);
        } catch ( error) {
            console.log("Get All Items Error \n ", error);
        }
    }
    
    const addToInventory = async (e) => {
        e.preventDefault();
        let item = {
            // 'id': items.length,
            'name': newTitle,
            'owner': myAddress
        };

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
                let isSup = await MarketContract.bSupplier();
                if(!isSup){
                    await MarketContract.becomeSupplier();
                }
                MarketContract.createItem(newTitle)
                    .then(response => {
                        // setItems([...items, item]);
                        console.log("Added an item");
                        getAllItems();
                    }); 
            }
        } catch (error){
            console.log("AddToInventory Error \n ", error);
        }        
    }
    
    const removeInventory = async (e) => {
        e.preventDefault();
        try{
            const { ethereum } = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const MarketContract = new ethers.Contract(
                    MarketplaceAddress,
                    MarketAbi.abi,
                    signer
                );
                let isSup = await MarketContract.bSupplier();
                if(!isSup){
                    console.log("please add an item, you are not a supplier.");
                    return;
                }
                MarketContract.removeItem(oldTitle)
                    .then(response => {
                        // setItems([...items, item]);
                        console.log("Rmoved an item");
                        getAllItems();
                    }); 
            }            
        } catch (error){
            console.log("RemoveFromInventory");
        }
    }

    useEffect(() =>{
        checkWallet()
    } , []);

    return (
        <>  
            <div className="main-component">
                <h1 className="title">Supplier</h1>
                <div className="flex flex-row gap-3 mb-5">
                    <div className="flex flex-column gap-2">
                        <InputText value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                        <Button label="Add To Inventory" onClick={(e) => addToInventory(e)}></Button>
                    </div>
                    <div className="flex flex-column gap-2">
                        <InputText value={oldTitle} onChange={(e) => setOldTitle(e.target.value)}/>
                        <Button label="Remove From Inventory" severity="danger" onClick={(e) => removeInventory(e)}></Button>
                    </div>
                </div>
                <div className="flex align-content-start mb-3">
                    <Button label="Get Inventory" severity="help" onClick={() => getAllItems()} />
                </div>
                <div className={`flex flex-column  gap-3 ${show === true ? 'show' : 'hidden'}`}>
                    {
                        items.map((item,index) => <Item key={index} title={item.name} quantity={parseInt(item.quantity, 16)}/>)
                    }

                    {/* <Item title="aa" quantity="1"></Item>
                    <Item title="aa" quantity="1"></Item>
                    <Item title="aa" quantity="1"></Item> */}
                </div>
            </div>
        </>
    )
}

export default Supplier;