// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "./ERC721Standard.sol";

contract MyERC721Factory {
    address[] public created;

    function createERC721Contract(string memory _name, string memory _symbol)
        public
        returns (ERC721Standard)
    {
        ERC721Standard erc721Contract =
            new ERC721Standard(_name, _symbol, msg.sender);
        created.push(address(erc721Contract));
        return erc721Contract;
    }

    function getLastCreated() public view returns (address) {
        require(created.length > 0);
        return created[created.length - 1];
    }
}
