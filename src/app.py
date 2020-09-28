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
        bytecode = contractInterface['bin']).constructor(starterAddress, amount, days, title, description).transact()

    address = web3.eth.getTransactionReceipt(txHash)['contractAddress']
    return address

ganacheURL = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganacheURL))

fundingContractPath= "../Contracts/Funding.sol"
compiledSol = compileSourceFile(fundingContractPath)


contractId, contractInterface = compiledSol.popitem()

fundingContractAddress = deployContract(web3, contractInterface)

print(f'Deployed {contractId} to: {fundingContractAddress}\n')

# print(f'Deployed {contract_id} to: {address}\n')

# store_var_contract = w3.eth.contract(address=address, abi=contract_interface["abi"])

# gas_estimate = store_var_contract.functions.setVar(255).estimateGas()
# print(f'Gas estimate to transact with setVar: {gas_estimate}')

# if gas_estimate < 100000:
#      print("Sending transaction to setVar(255)\n")
#      tx_hash = store_var_contract.functions.setVar(255).transact()
#      receipt = w3.eth.waitForTransactionReceipt(tx_hash)
#      print("Transaction receipt mined:")
#      pprint.pprint(dict(receipt))
#      print("\nWas transaction successful?")
#      pprint.pprint(receipt["status"])
# else:
#      print("Gas cost exceeds 100000")










# Original file 

# with open("./abi.json") as f:
#     abi = json.load(f)

# address = "0x2cAaaf7af99eE2c5F965B11060a85465f277B88f"
# address = web3.toChecksumAddress(address)

# contract = web3.eth.contract(address = address, abi = abi)

# print(contract.functions.sampleGreeting().call())

# title = "Medivisor"
# description = "Rural HealthCare"
# days = 1
# amount = 300

#contract.functions.startProject(title, description, days, amount).transact()

