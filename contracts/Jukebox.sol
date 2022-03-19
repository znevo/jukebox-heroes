// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

interface IRecord {
    function mint(address to) external returns (uint256);
}

contract Jukebox is Ownable {
    address public record__721;
    address public record__1155;

    address[] public catalog__721;
    address[] public catalog__1155;

    Record[] public catalog;

    struct Record {
        address __721;
        address __1155;
        address charity;
        uint charityRoyalty;
        uint mintersRoyalty;
        uint jukeboxRoyalty;
    }

    event RecordPressed__721(address record);
    event RecordPressed__1155(address record);
    event RecordPressed(address record__721, address record__1155);

    constructor(address implementation__721, address implementation__1155) {
        record__721 = implementation__721;
        record__1155 = implementation__1155;
    }

    function press__721(
        string memory name,
        string memory symbol,
        string memory uri,
        uint maxSupply,
        uint price
    ) public returns(address record){
        record = Clones.clone(record__721);
        (bool success, ) = record.call(abi.encodeWithSignature("initialize(string,string,string,uint256,uint256)", name, symbol, uri, maxSupply, price));
        require(success);
        catalog__721.push(record);
        emit RecordPressed__721(record);
        return record;
    }

    function press__1155(
        string memory name,
        string memory symbol,
        string memory uri,
        uint price
    ) public returns(address record) {
        record = Clones.clone(record__1155);
        (bool success, ) = record.call(abi.encodeWithSignature("initialize(string,string,string,uint256)", name, symbol, uri, price));
        require(success);
        catalog__1155.push(record);
        emit RecordPressed__1155(record);
        return record;
    }

    function pressRecord(
        string memory name,
        string memory symbol,
        string memory uri,
        uint ltdSupply,
        uint ltdPrice,
        uint price,
        address charity,
        uint charityRoyalty,
        uint mintersRoyalty,
        uint jukeboxRoyalty
    ) external {
        address address__721 = press__721(name, symbol, uri, ltdSupply, ltdPrice);
        address address__1155 = press__1155(name, symbol, uri, price);

        catalog.push(Record({
            __721: address__721,
            __1155: address__1155,
            charity: charity,
            charityRoyalty: charityRoyalty,
            mintersRoyalty: mintersRoyalty,
            jukeboxRoyalty: jukeboxRoyalty
        }));

        emit RecordPressed(address__721, address__1155);
    }

    function getCatalog() public view returns(Record[] memory) {
        return catalog;
    }

    function mintRecord(address recordAddr) external {
        IRecord(recordAddr).mint(msg.sender);
    }
}
