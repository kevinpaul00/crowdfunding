var Funding = artifacts.require("../contracts/Funding.sol");

module.exports = function(deployer) {
  deployer.deploy(Funding);
};
