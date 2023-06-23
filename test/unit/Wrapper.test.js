const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const TokenWrapper = artifacts.require("TokenWrapper");

contract("TokenWrapper", (accounts) => {
  let tokenAInstance;
  let tokenBInstance;
  let tokenWrapperInstance;

  const [operator, depositor, recipient] = accounts;

  beforeEach(async () => {
    // Deploy TokenA
    tokenAInstance = await TokenA.new(100000, { from: operator });

    // Deploy TokenB
    tokenBInstance = await TokenB.new({ from: operator });

    // Deploy TokenWrapper with TokenA and TokenB addresses
    tokenWrapperInstance = await TokenWrapper.new(
      tokenAInstance.address,
      tokenBInstance.address,
      { from: operator }
    );

    // Set operator of TokenB to TokenWrapper contract
    await tokenBInstance.transferOwnership(tokenWrapperInstance.address, { from: operator });

      // Operator sends 500 tokens to the depositor
  await tokenAInstance.transfer(depositor, 500, { from: operator });

    // Output balances of all ERC20 tokens for all accounts
    console.log("---- Balances at the beginning ----");
    console.log("TokenA balance of operator:", (await tokenAInstance.balanceOf(operator)).toString());
    console.log("TokenB balance of operator:", (await tokenBInstance.balanceOf(operator)).toString());
    console.log("TokenA balance of depositor:", (await tokenAInstance.balanceOf(depositor)).toString());
    console.log("TokenB balance of depositor:", (await tokenBInstance.balanceOf(depositor)).toString());
    console.log("TokenA balance of recipient:", (await tokenAInstance.balanceOf(recipient)).toString());
    console.log("TokenB balance of recipient:", (await tokenBInstance.balanceOf(recipient)).toString());
    console.log("-------------------------------------");

  });


it("should deposit TokenA and mint TokenB", async () => {
    const depositAmount = 500;
    
    let owner = await tokenBInstance.owner();
    console.log('Owner:', owner);
    console.log("Wrapper", tokenWrapperInstance.address)

    await tokenAInstance.approve(tokenWrapperInstance.address, depositAmount, { from: depositor });
    
    // Deposit TokenA and mint TokenB
    await tokenWrapperInstance.deposit(depositAmount, { from: depositor });

    // Check TokenA balance of the depositor
    const tokenABalance = await tokenAInstance.balanceOf(depositor);
    
    // Check TokenB balance of the recipient
    const tokenBBalance = await tokenBInstance.balanceOf(depositor);
    
    assert.equal(
        tokenABalance.toString(),
        '0',
        "TokenA balance is incorrect"
    );

    assert.equal(
        tokenBBalance.toString(),
        depositAmount.toString(),
        "TokenB balance is incorrect"
    );

        console.log("---- Balances at the beginning ----");
    console.log("TokenA balance of operator:", (await tokenAInstance.balanceOf(operator)).toString());
    console.log("TokenB balance of operator:", (await tokenBInstance.balanceOf(operator)).toString());
    console.log("TokenA balance of depositor:", (await tokenAInstance.balanceOf(depositor)).toString());
    console.log("TokenB balance of depositor:", (await tokenBInstance.balanceOf(depositor)).toString());
    console.log("TokenA balance of recipient:", (await tokenAInstance.balanceOf(recipient)).toString());
    console.log("TokenB balance of recipient:", (await tokenBInstance.balanceOf(recipient)).toString());
    console.log("-------------------------------------");
    });
});
