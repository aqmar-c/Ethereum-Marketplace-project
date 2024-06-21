// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

//Should probably use SafeMath
import "hardhat/console.sol";

contract ItemFactory {

    struct Item{
        uint id;
        string name;
        address owner;
        uint quantity;
    }

    Item[]  items;
    uint  id = 0;
    mapping (uint => address) itemsToOwner;

    event ItemCreated(string _name, address _owner, uint _itemId, uint quantity);
    event OwnershipChange(uint _itemId, address _oldOwner, address _newOwner);

    function createItem(string memory _name, address _owner) internal returns (uint) {

        for(uint i = 0 ; i < items.length ; i++){
            if(keccak256(abi.encodePacked(items[i].name)) == keccak256(abi.encodePacked(_name)) && items[i].owner == _owner){
                console.log("current item quantity (in createItem function) =  ", items[i].quantity);
                uint cur_quantity = items[i].quantity;
                items[i].quantity = cur_quantity + 1;
                emit ItemCreated(_name, _owner, i, items[i].quantity);
                return i;
            }
        }

        items.push(Item(id, _name, _owner, 1));
        itemsToOwner[id] = _owner;
        console.log("from Item items length = ", items.length );
        id++;
        emit ItemCreated(_name, _owner, id, 1);
        return (id-1);
    }

    function getExistingItems() public view returns (Item[] memory){
        return items;
    }
    //remove item 
    function removeItem(string memory _name, address _owner) internal{
        for(uint i = 0 ; i < items.length ; i++){
            if(keccak256(abi.encodePacked(items[i].name)) == keccak256(abi.encodePacked(_name)) && items[i].owner == _owner){
                console.log("current item quantity (in removeItem function) = ", items[i].quantity);
                uint cur_quantity = items[i].quantity;
                if(cur_quantity > 1){
                    cur_quantity = cur_quantity - 1;
                    Item memory ret = items[i];
                    ret.quantity = cur_quantity;
                    items[i] = ret;
                } else {
                    items[i] = items[items.length - 1];
                    items.pop();
                }    
            }
        }
    }

    //for buyer change ownership
    

}