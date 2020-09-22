import json
from web3 import Web3

ganacheURL = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganacheURL))

with open("src/abi.json") as f:
    abi = json.load(f)

address = "0x2Be7CA74148184EaD125e28D2246908042631304"
address = web3.toChecksumAddress(address)

contract = web3.eth.contract(address = address, abi = abi)

print(contract.functions.sampleGreeting().call())

