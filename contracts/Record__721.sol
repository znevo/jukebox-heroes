// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Record__721 is ERC721Enumerable, Initializable, Ownable {
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
        _transferOwnership(_msgSender());
    }

    function mint(address to, uint price) public onlyOwner returns (uint256) {
        require(price >= _price, 'The minimum price was not met!');

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