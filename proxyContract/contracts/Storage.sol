// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

//can change functionality, but
//we can't change storage. can corrupt prop storage
//think thru wt type of storage we need

contract Storage {
  mapping (string => uint256) _uintStorage;
  mapping (string => address) _addressStorage;
  mapping (string => bool) _boolStorage;
  mapping (string => string) _stringStorage;
  mapping (string => bytes4) _bytesStorage;
  address public owner;
  bool public _initialized;
}
