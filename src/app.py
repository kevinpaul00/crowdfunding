import json
from solcx import compile_source
from web3 import Web3

def compileSourceFile(path):
    with open(path, 'r') as f:
        source = f.read();
    
    return compile_source(source)

def deployContract(web3, contractInterface):
    starterAddress = "0x35Ad2195bc22B5b831F65C7749dDea66193724Dc"
    title = "Medivisor"
    description = "Rural HealthCare"
    days = 1
    amount = 300
    txHash = web3.eth.contract(
        abi = contractInterface['abi'],
        bytecode = contractInterface['bin']).constructor().transact()

    address = web3.eth.getTransactionReceipt(txHash)['contractAddress']
    return address

ganacheURL = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganacheURL))

fundingContractPath= "../Contracts/Crowdfunding.sol"
compiledSol = compileSourceFile(fundingContractPath)

contractId, contractInterface = compiledSol.popitem()

fundingContractAddress = deployContract(web3, contractInterface)

print(f'Deployed {contractId} to: {fundingContractAddress}\n')
