// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Item.sol";
import "hardhat/console.sol";
//Should probably use SafeMath

contract Supplier is ItemFactory {

    address owner;
    Item[] public inventory;
    
    event ItemAddedToInventory(string _name, address _owner, uint _itemId, uint quantity);
    
    constructor(address _owner){
        owner = _owner;
    }

    modifier isOwner(address _owner){
        require(owner == _owner);
        _;
    }

    function addItemToInventory(string memory _name, address _owner) public isOwner(_owner) {
        uint itemId = createItem(_name, _owner);
        
        for(uint i = 0 ; i < inventory.length ; i++){
            if(keccak256(abi.encodePacked(inventory[i].name)) == keccak256(abi.encodePacked(_name)) && inventory[i].owner == _owner){
                console.log("current supplier quantity = ", inventory[i].quantity);
                uint cur_quantity = inventory[i].quantity;
                inventory[i].quantity = cur_quantity + 1;
                emit ItemAddedToInventory(_name, _owner, i, inventory[i].quantity);
                return;
            }
        }
        console.log("from Supplier items length = ", items.length);
        inventory.push(items[itemId]);
        emit ItemAddedToInventory(_name, _owner, itemId, 1);
    }

    function removeItemFromInventory(string memory _name, address _owner) public isOwner(_owner){
        removeItem(_name, _owner);
        for(uint i = 0 ; i < inventory.length ; i++){
            if(keccak256(abi.encodePacked(inventory[i].name)) == keccak256(abi.encodePacked(_name))){
                // console.log("current supplier quantity = ", inventory[i].quantity);
                uint cur_quantity = inventory[i].quantity;
                if(cur_quantity > 1){
                    cur_quantity = cur_quantity - 1;
                    Item memory ret = inventory[i];
                    ret.quantity = cur_quantity;
                    inventory[i] = ret;
                } else {
                    inventory[i] = inventory[inventory.length - 1];
                    inventory.pop();
                }              
            }
        }
    }

    function getInventory() public view returns(Item[] memory){
        return(inventory);
    }


    //We assume any item in the inventory is for sale
    function sellItem(string memory _name) public returns(Item memory soldItem){
        console.log("name to sell is " , _name);
        for (uint i = 0; i<inventory.length; i++){
            if(keccak256(abi.encodePacked(inventory[i].name)) == keccak256(abi.encodePacked(_name))) {
                Item memory ret = inventory[i];
                if(inventory[i].quantity > 1){
                    uint cur_quantity = ret.quantity;
                    ret.quantity = cur_quantity - 1;
                    inventory[i] = ret;
                } else {
                    inventory[i] = inventory[inventory.length - 1];
                    inventory.pop();
                }
                return ret;
            }            
        }
        require(false);
    }

    function getCurrentItems() public view returns(Item[] memory){
        return items;
    }

  

    
}