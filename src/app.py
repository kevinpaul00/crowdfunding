import json
from web3 import Web3

ganacheURL = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganacheURL))

with open("src/abi.json") as f:
    abi = json.load(f)

address = "0xbD8A3564c77A65B5F20dDb4032b72B60b12BFa03"
address = web3.toCheckSumAddress(address)

contract = web3.eth.contract(address = address, abi = abi)

print(contract.functions.returnAllProjects().call())