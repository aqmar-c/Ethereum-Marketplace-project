// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


import "./Supplier.sol";
import "./Buyer.sol";
import "hardhat/console.sol";

//Should probably use SafeMath

contract Marketplace is ItemFactory {

    mapping (address => uint) suppliersMap;
    mapping (address => uint) buyersMap;

    Supplier[] suppliers;
    uint supplierCount = 1;

    Buyer[] buyers;
    uint buyerCount = 1;

    // Item[] public  cur_items;
    modifier notSupplier{
        require (suppliersMap[msg.sender] == 0);
        _;
    }

    modifier isSupplier{
        require (suppliersMap[msg.sender] != 0);
        _;
    }

    modifier isBuyer{
        require (buyersMap[msg.sender] != 0);
        _;
    }

    modifier notBuyer{
        require (buyersMap[msg.sender] == 0);
        _;
    }

    function bSupplier() external view returns (bool ){
        if( suppliersMap[msg.sender] == 0)
            return false;
        else 
            return true;
    }

    function bBuyer() external view returns (bool ){
        if(buyersMap[msg.sender] == 0)
            return false;
        else
            return true;
    }

    function becomeSupplier() public notSupplier {
        Supplier sup = new Supplier(msg.sender);
        suppliers.push(sup);
        suppliersMap[msg.sender] = supplierCount;
        supplierCount++;
    }

    function becomeBuyer() public notBuyer {
        Buyer buy = new Buyer(msg.sender);
        buyers.push(buy);
        buyersMap[msg.sender] = buyerCount;
        buyerCount++;
    }

    // Methods for suppliers
    function createItem(string memory _name) public isSupplier {
        suppliers[suppliersMap[msg.sender] - 1].addItemToInventory(_name, msg.sender);
    }

    function removeItem(string memory _name) public isSupplier{
        suppliers[suppliersMap[msg.sender] - 1].removeItemFromInventory(_name, msg.sender);

    }

    // Methods for Buyers
    function buyItem(address _supplier, string memory _itemName) public isBuyer {
        console.log("called buyItem");
        Item memory item = suppliers[suppliersMap[_supplier] - 1].sellItem(_itemName);
        item.owner = msg.sender;
        buyers[buyersMap[msg.sender]-1].addItem(item);
    }

    // Methods for Everyone
    function getInventory(address _supplier) public view returns (Item[] memory) {
        // require(suppliersMap.length > 0);
        return (suppliers[suppliersMap[_supplier]-1].getInventory());
    }

    function getItems(address _buyer) public view returns (Item[] memory) {
        return (buyers[buyersMap[_buyer]-1].getItems());
    }

    function getAllItems() public view returns (Item[] memory){
        
        // delete cur_items;
        // for(uint i = 0 ; i < suppliers.length;  i++){
        //     Item[] memory temps = suppliers[i].getCurrentItems();
        //     for(uint j = 0 ; j < temps.length ; j++){
        //         cur_items.push(temps[j]);
        //     }
        // }
        // return cur_items;
        Item[] memory cur_items;
        if(suppliers.length > 0){
            return suppliers[0].getCurrentItems();
        } else {
            return cur_items; //returns empty array
        }
  
    }
}