// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract Jukebox is Ownable {
    address public record__721;
    address public record__1155;

    address[] public catalog__721;
    address[] public catalog__1155;

    event RecordPressed(address _record);

    constructor(address _implementation__721, address _implementation__1155) {
        record__721 = _implementation__721;
        record__1155 = _implementation__1155;
    }

    function press__721(string memory name_, string memory symbol_, string memory uri_) external returns(address record) {
        record = Clones.clone(record__721);
        (bool success, ) = record.call(abi.encodeWithSignature("initialize(string,string,string)", name_, symbol_, uri_));
        require(success);
        catalog__721.push(record);
        emit RecordPressed(record);
        return record;
    }

    function press__1155(string memory name_, string memory symbol_, string memory uri_) external returns(address record) {
        record = Clones.clone(record__1155);
        (bool success, ) = record.call(abi.encodeWithSignature("initialize(string,string,string)", name_, symbol_, uri_));
        require(success);
        catalog__1155.push(record);
        emit RecordPressed(record);
        return record;
    }
}
