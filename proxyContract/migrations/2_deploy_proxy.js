// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

const Dogs = artifacts.require('Dogs');
const DogsUpdated = artifacts.require('DogsUpdated');
const Proxy = artifacts.require('Proxy');

module.exports = async function(deployer, network, accounts){
  //Deployed Contracts
  const dogs = await Dogs.new();  //dog.new take the source file n deploy it so we get deployed instant //await means wait this to finish b4 to next License
  const proxy = await Proxy.new(dogs.address); //dogs.address act as constructor of proxy contract
    //then successfully deployed Dogs n Proxy contract

  //fooling truffle that proxy is dog.sol
  //.at is a truffle func that tells truffle to creatn instance of dog contract but from already exist deployed contract
  var proxyDog = await Dogs.at(proxy.address);

  //set Nr of dogs thru proxy
  await proxyDog.setNumberOfDogs(10);

  //Tested
  var nrOfDogs = await proxyDog.getNumberOfDogs();
  console.log("Before updated: " + nrOfDogs.toNumber());

  //Deploy new version of Dogs
  const dogsUpdated = await DogsUpdated.new();
  proxy.upgrade(dogsUpdated.address);

  //Fool truffle once again.It now thinks proxyDog has all functions
  proxyDog = await DogsUpdated.at(proxy.address);
  //initialize proxy state. Now has same state as Dog
  proxyDog.initialize(accounts[0]);

  //Check so that storage remained
  nrOfDogs = await proxyDog.getNumberOfDogs();
  console.log("After updated: " + nrOfDogs.toNumber());

  //set Nr of dogs thru proxy with NEW FUNC CONTRACT
  await proxyDog.setNumberOfDogs(30, {from: accounts[1]});

  //Check so that setNumberOfDogs worked with NEW func contract
  nrOfDogs = await proxyDog.getNumberOfDogs();
  console.log("After updated: " + nrOfDogs.toNumber());
}
