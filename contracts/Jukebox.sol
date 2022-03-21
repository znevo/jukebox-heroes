// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

interface IRecord {
    function mint(address to, uint price) external returns (uint256);
}

contract Jukebox is Ownable {
    address public record__721;
    address public record__1155;

    address[] public catalog__721;
    address[] public catalog__1155;

    Record[] public catalog;
    mapping(address => uint) public recordIndex;
    mapping(address => address[]) public minters;

    struct Record {
        address __721;
        address __1155;
        address payable creator;
        address payable charity;
        uint ltdSupply;
        uint charityRoyalty;
        uint mintersRoyalty;
        uint jukeboxRoyalty;
        uint revenue__721;
        uint revenue__1155;
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
            creator: payable(msg.sender),
            charity: payable(charity),
            ltdSupply: ltdSupply,
            charityRoyalty: charityRoyalty,
            mintersRoyalty: mintersRoyalty,
            jukeboxRoyalty: jukeboxRoyalty,
            revenue__721: 0,
            revenue__1155: 0
        }));

        recordIndex[address__721] = catalog.length - 1;
        recordIndex[address__1155] = catalog.length - 1;

        emit RecordPressed(address__721, address__1155);
    }

    function getCatalog() public view returns(Record[] memory) {
        return catalog;
    }

    function getRecord(address recordAddr) public view returns(Record memory) {
        return catalog[recordIndex[recordAddr]];
    }

    function mintRecord(address recordAddr) external payable {
        if ( recordAddr == catalog[recordIndex[recordAddr]].__721 ) {
            catalog[recordIndex[recordAddr]].revenue__721 += msg.value;
            minters[recordAddr].push(msg.sender);
        } else if ( recordAddr == catalog[recordIndex[recordAddr]].__1155 ) {
            catalog[recordIndex[recordAddr]].revenue__1155 += msg.value;
        } else {
            revert('Record not found!');
        }

        IRecord(recordAddr).mint(msg.sender, msg.value);
    }

    function distributeRevenue(address[] memory records) external {
        for (uint i = 0; i < records.length; i++) {
            address recordAddr = records[i];
            Record storage record = catalog[recordIndex[recordAddr]];

            // calculate the 721 revenue to artists and charities
            uint charityRevenue__721 = (record.revenue__721 / 100) * record.charityRoyalty;
            uint jukeboxRevenue__721 = (record.revenue__721 / 100) * record.jukeboxRoyalty;
            uint creatorRevenue__721 = record.revenue__721 - charityRevenue__721 - jukeboxRevenue__721;

            // calculate the 1155 revenue to artists and charities
            uint charityRevenue__1155 = (record.revenue__1155 / 100) * record.charityRoyalty;
            uint jukeboxRevenue__1155 = (record.revenue__1155 / 100) * record.jukeboxRoyalty;
            uint creatorRevenue__1155 = record.revenue__1155 - charityRevenue__1155 - jukeboxRevenue__1155;

            // calculate the 1155 revenue to ltd. edition minters
            address[] memory ltdMinters = minters[record.__721];
            uint microRevenue = ((record.revenue__1155 / 100) * record.mintersRoyalty) / record.ltdSupply;
            uint mintersRevenue = microRevenue * ltdMinters.length;

            // calculate total creator revenue
            uint creatorRevenue = creatorRevenue__721 + creatorRevenue__1155 - mintersRevenue;

            // calculate total charity revenue
            uint charityRevenue = charityRevenue__721 + charityRevenue__1155;

            // update the balance on the record to reflect the distributions
            record.revenue__1155 = 0;
            record.revenue__721 = 0;

            // distribute revenue to creator
            (bool sentCreator, ) = payable(record.creator).call{value: creatorRevenue}("");
            require(sentCreator, 'Failed to distribute revenue to creator!');

            // distribute revenue to charity
            (bool sentCharity, ) = payable(record.charity).call{value: charityRevenue}("");
            require(sentCharity, 'Failed to distribute revenue to charity!');

            // distribute revenue to individual ltd. minters
            for ( uint c = 0; c < ltdMinters.length; c++ ) {
                address payable ltdMinter = payable(ltdMinters[c]);
                (bool sentMicro, ) = ltdMinter.call{value: microRevenue}("");
                require(sentMicro, 'Failed to distribute revenue to limited edition minter!');
            }
        }
    }
}
