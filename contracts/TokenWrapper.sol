pragma solidity >=0.8.0 <0.9.0;

interface ITokenMinter {
    function mint(address to, uint256 amount) external;

    function burn(address from, uint256 amount) external;
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract TokenWrapper {
    IERC20 public tokenA;
    ITokenMinter public tokenB;
    address public operator;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdraw(address indexed recipient, uint256 amount);

    constructor(address _tokenA, address _tokenB) {
        require(_tokenA != address(0), "Invalid TokenA address");
        require(_tokenB != address(0), "Invalid TokenB address");
        operator = msg.sender;
        tokenA = IERC20(_tokenA);
        tokenB = ITokenMinter(_tokenB);
    }

    modifier onlyOperator() {
        require(
            msg.sender == operator,
            "Only the operator can perform this action"
        );
        _;
    }

    function setOperator(address _operator) external onlyOperator {
        operator = _operator;
    }

    function deposit(uint256 amount) external {
        // Transfer the tokens to this contract
        require(
            tokenA.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        tokenB.mint(msg.sender, amount);
        emit Deposit(msg.sender, amount);
    }

    function withdraw(address recipient, uint256 amount) external onlyOperator {
        tokenA.transfer(recipient, amount);
        emit Withdraw(recipient, amount);
    }
}
