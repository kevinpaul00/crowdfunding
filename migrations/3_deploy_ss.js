var Funding = artifacts.require("../contracts/SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Funding);
};
