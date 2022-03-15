// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Record__1155 is ERC1155, Initializable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public name;
    string public symbol;

    function initialize(string memory _name, string memory _symbol, string memory uri) public initializer {
        name = _name;
        symbol = _symbol;
        _setURI(uri);
    }

    function mint() public returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId, 1, '');

        return tokenId;
    }
}
