var Project = artifacts.require("../contracts/Project.sol");
var Funding = artifacts.require("../contracts/Funding.sol");

module.exports = function(deployer) {
  deployer.deploy(Funding);
  //deployer.deploy(Project);
};
