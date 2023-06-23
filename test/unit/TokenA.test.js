const TokenA = artifacts.require("TokenA");

contract("TokenA", (accounts) => {
  let token;

  beforeEach(async () => {
    token = await TokenA.new(1000);
  });

  it("should deploy the contract and set the initial balance correctly", async () => {
    const deployer = accounts[0];
    const balance = await token.balanceOf(deployer);

    assert.equal(balance.toNumber(), 1000, "Deploying address has incorrect balance");
  });

  it("should transfer tokens correctly", async () => {
    const [sender, recipient] = accounts;

    await token.transfer(recipient, 500, { from: sender });
    const senderBalance = await token.balanceOf(sender);
    const recipientBalance = await token.balanceOf(recipient);

    assert.equal(senderBalance.toNumber(), 500, "Sender has incorrect balance");
    assert.equal(recipientBalance.toNumber(), 500, "Recipient has incorrect balance");
  });


});
