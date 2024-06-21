// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Item.sol";

//Should probably use SafeMath

contract Buyer is ItemFactory {
    
    address owner;
    Item[] myItems;
    
    event BoughtItem(Item _item);

    constructor(address _owner){
        owner = _owner;
    }

    function addItem(Item memory _item) public {
        for(uint i = 0 ; i < myItems.length ; i++){
            if(keccak256(abi.encodePacked(myItems[i].name)) == keccak256(abi.encodePacked(_item.name)) && myItems[i].owner == _item.owner){
                console.log("current buyer quantity = ", myItems[i].quantity);
                uint cur_quantity = myItems[i].quantity;
                myItems[i].quantity = cur_quantity + 1;
                emit BoughtItem(_item);
                return;
            }
        }

        myItems.push(_item);
        emit BoughtItem(_item);
    }

    function getItems() public view returns(Item[] memory) {
        return(myItems);
    }

}