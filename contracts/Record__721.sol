// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Record__721 is ERC721, Initializable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _uri;

    function initialize(string memory name, string memory symbol, string memory uri) public initializer {
        _name = name;
        _symbol = symbol;
        _uri = uri;
    }

    function mint() public returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);

        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _uri;
    }
}