var Project = artifacts.require("../contracts/Project.sol");

module.exports = function(deployer) {
  deployer.deploy(Project);
};
