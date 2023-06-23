const TokenWrapper = artifacts.require("TokenWrapper");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

module.exports = async function (deployer) {
  try {
    // Get the deployed instances of TokenA and TokenB
    const tokenAInstance = await TokenA.deployed();
    const tokenBInstance = await TokenB.deployed();

    // Deploy TokenWrapper and pass the addresses of TokenA and TokenB
    await deployer.deploy(TokenWrapper, tokenAInstance.address, tokenBInstance.address);
  } catch (error) {
    console.error("Failed to deploy TokenWrapper:", error);
  }
};
