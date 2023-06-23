const TokenB = artifacts.require("TokenB");

contract("TokenB", (accounts) => {
  let token;
  const operator = accounts[0];
  const nonOperator = accounts[1];
  const recipient = accounts[2];

  beforeEach(async () => {
    token = await TokenB.new();
  });

  it("should deploy the contract and set the initial balance correctly", async () => {
    const balance = await token.balanceOf(operator);
    assert.equal(balance.toNumber(), 0, "Operator has incorrect balance");
  });

  it("should mint tokens correctly when called by the operator", async () => {
    const amount = 1000;

    let owner = await token.owner();
    console.log('Owner:', owner);
    console.log("Operator", operator)


    //await token.transferOwnership(operator);
    await token.mint(recipient, amount, { from: operator });
    assert.equal(owner, operator, "Error Operator");

    const recipientBalance = await token.balanceOf(recipient);
    assert.equal(recipientBalance.toNumber(), amount, "Recipient has incorrect balance");
  });

  it("should not allow non-operators to mint tokens", async () => {
    const amount = 1000;

    try {
      await token.mint(recipient, amount, { from: nonOperator });
      assert.fail("Non-operator was able to mint tokens");
    } catch (error) {
      assert.include(
        error.message,
        "revert",
        "Non-operator was not blocked from minting tokens"
      );
    }

    const recipientBalance = await token.balanceOf(recipient);
    assert.equal(recipientBalance.toNumber(), 0, "Recipient should not receive any tokens");
  });

  it("should allow changing the operator", async () => {
    const newOperator = accounts[3];

    await token.transferOwnership(operator, { from: operator });
    const initialOperator = await token.owner();

    await token.transferOwnership(newOperator, { from: operator });
    const updatedOperator = await token.owner();

    assert.equal(initialOperator, operator, "Initial operator is incorrect");
    assert.equal(updatedOperator, newOperator, "Operator was not updated correctly");
  });
});
