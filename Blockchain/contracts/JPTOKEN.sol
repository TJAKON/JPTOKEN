// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JPTOKEN is ERC20, ERC20Permit, Ownable {
    uint256 public constant INITIAL_SUPPLY = 21000000000 * (10 ** 18);
    uint256 public constant MAX_CLAIM = 500 * (10 ** 18);
    uint256 public constant FEE_PERCENTAGE = 5;
    uint256 public tokensRemaining = INITIAL_SUPPLY;
    mapping(address => uint256) public claimedTokens;
    address[] public tokenHolders;

    constructor(address initialOwner) ERC20("JPTOKEN", "JPT") ERC20Permit("JPTOKEN") Ownable(initialOwner) {
        _mint(initialOwner, INITIAL_SUPPLY);
        tokenHolders.push(initialOwner); // Add initial owner as token holder
    }

    function getJPTBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

function claimTokens(address recipient, uint256 amount) public onlyOwner returns (bool) {
    require(recipient != address(0), "ERC20: transfer to the zero address");
    require(claimedTokens[recipient] + amount <= MAX_CLAIM, "Max claim exceeded");
    require(amount <= tokensRemaining, "Not enough tokens remaining");

    claimedTokens[recipient] += amount;
    tokensRemaining -= amount;

    _transfer(msg.sender, recipient, amount); // Transfer tokens without fee

    return true;
}


function _update(address from, address to, uint256 value) internal override {
    require(to != address(0), "ERC20: transfer to the zero address");

    if (from != address(0)) {
        require(from != address(this), "ERC20: transfer from the zero address");

        uint256 fee = (value * FEE_PERCENTAGE) / 100; // Calculating 5% fee
        uint256 amountAfterFee = value - fee; // Calculating amount after deducting fee

        super._update(from, to, amountAfterFee); // Update balances after deducting fee
        _distributeFee(fee); // Distribute the fee to token holders

        // Update the list of token holders
        _updateTokenHolders(from, to);
    } else {
        super._update(from, to, value); // Update balances without fee
        _updateTokenHolders(address(0), to);
    }
}

    function _distributeFee(uint256 fee) internal {
        uint256 totalSupply = totalSupply();
        for (uint256 i = 0; i < tokenHolders.length; i++) {
            address holder = tokenHolders[i];
            uint256 balance = balanceOf(holder);
            uint256 feeShare = (balance * fee) / totalSupply;
            _mint(holder, feeShare); // Mint new tokens to distribute the fee back to token holders
        }
    }

    function _updateTokenHolders(address from, address to) internal {
        if (balanceOf(to) > 0 && !isTokenHolder(to)) {
            tokenHolders.push(to);
        }
        if (balanceOf(from) == 0 && isTokenHolder(from)) {
            _removeTokenHolder(from);
        }
    }

    function _removeTokenHolder(address account) internal {
        uint256 length = tokenHolders.length;
        for (uint256 i = 0; i < length; i++) {
            if (tokenHolders[i] == account) {
                tokenHolders[i] = tokenHolders[length - 1];
                tokenHolders.pop();
                break;
            }
        }
    }

    function isTokenHolder(address account) public view returns (bool) {
        for (uint256 i = 0; i < tokenHolders.length; i++) {
            if (tokenHolders[i] == account) {
                return true;
            }
        }
        return false;
    }
}


// Deploy#JPTOKEN - 0x358A45ddceb5fA50Ca388B99a39E6c9298A5fB07