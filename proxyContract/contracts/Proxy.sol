// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./Storage.sol";
//need proxy to redirect all func call to func contract


contract Proxy is Storage {

  address currentAddress;

  constructor(address _currentAddress) public {
    currentAddress = _currentAddress;
  }
  function upgrade(address _newAddress) public {
    currentAddress = _newAddress;
  }

  //fallback. if sb make a call not exist, it'll call fallback function
  function () payable external {
    address _implementation = currentAddress;
    require(currentAddress != address(0));
    bytes memory data = msg.data;

    //Delegate Call every function call 
    assembly {
      let result := delegatecall(gas, implementation, add(data, 0x20), mload(data), 0, 0)
      let size := returndatasize
      let ptr := mload(0x40)
      returndatacopy(ptr, 0, size)
      switch result
      case 0 {revert(ptr, size)}  //if case is 0, revert
      default {return(ptr, size)}  //else, default return
    } //dun hv to understand all of this. just need to trust take all data coming in
  }
}
321
