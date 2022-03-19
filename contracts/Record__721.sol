// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Record__721 is ERC721Enumerable, Initializable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public _uri;
    uint public _maxSupply;
    uint public _price;

    function initialize(string memory name_, string memory symbol_, string memory uri, uint maxSupply, uint price) public initializer {
        _name = name_;
        _symbol = symbol_;
        _uri = uri;
        _maxSupply = maxSupply;
        _price = price;
    }

    function mint(address to) public returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId);

        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _uri;
    }
}