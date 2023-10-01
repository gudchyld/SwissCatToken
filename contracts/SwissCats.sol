// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SwissCats is ERC20 {
    constructor() ERC20("SwissCats", "SC") {}

    function tokenMinter() public {
        _mint(msg.sender, 2000 * 10 ** 18);
    }
}
