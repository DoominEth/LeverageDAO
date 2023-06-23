const TokenB = artifacts.require("TokenB");

module.exports = async function (deployer) {
  await deployer.deploy(TokenB);
  const tokenBInstance = await TokenB.deployed();
  const tokenBAddress = tokenBInstance.address;

  // Export the tokenBAddress variable
  module.exports.tokenBAddress = tokenBAddress;
};
