// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Record__1155 is ERC1155, Initializable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public name;
    string public symbol;
    string public _uri;
    uint public _price;
    mapping(address => bool) public isOwner;

    function initialize(string memory name_, string memory symbol_, string memory uri_, uint price) public initializer {
        name = name_;
        symbol = symbol_;
        _setURI(uri_);
        _price = price;
        _transferOwnership(_msgSender());
    }

    function mint(address to, uint price) public onlyOwner returns (uint256) {
        require(price >= _price, 'The minimum price was not met!');

        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId, 1, '');
        isOwner[to] = true;

        return tokenId;
    }

    function _setURI(string memory newuri) internal override {
        _uri = newuri;
    }

    function uri(uint256) public view override returns (string memory) {
        return _uri;
    }
}
