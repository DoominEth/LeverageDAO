const TokenA = artifacts.require("TokenA");

module.exports = async function (deployer) {
  await deployer.deploy(TokenA, 1000);
  const tokenAInstance = await TokenA.deployed();
  const tokenAAddress = tokenAInstance.address;

  // Export the tokenAAddress variable
  module.exports.tokenAAddress = tokenAAddress;
};
