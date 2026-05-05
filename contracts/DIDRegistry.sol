// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DIDRegistry {
    struct DID {
        address owner;
        string did;
        uint256 timestamp;
    }

    struct Transaction {
        string action;
        uint256 timestamp;
        address initiator;
    }

    mapping(string => DID) private dids;
    mapping(string => Transaction[]) private didTransactions;

    event DIDCreated(address indexed owner, string did, uint256 timestamp);
    event DIDUpdated(address indexed owner, string did, uint256 timestamp);
    event DIDTransferred(address indexed from, address indexed to, string did, uint256 timestamp);

    // Register new DID
    function registerDID(string memory _did) external {
        require(bytes(_did).length > 0, "DID cannot be empty");
        require(dids[_did].owner == address(0), "DID already registered");
        dids[_did] = DID({owner: msg.sender, did: _did, timestamp: block.timestamp});
        didTransactions[_did].push(Transaction("REGISTER", block.timestamp, msg.sender));
        emit DIDCreated(msg.sender, _did, block.timestamp);
    }

    // Update existing DID
    function updateDID(string memory _did) external {
        require(dids[_did].owner == msg.sender, "Only owner can update DID");
        dids[_did].timestamp = block.timestamp;
        didTransactions[_did].push(Transaction("UPDATE", block.timestamp, msg.sender));
        emit DIDUpdated(msg.sender, _did, block.timestamp);
    }

    // Transfer DID to another address
    function transferDID(string memory _did, address _newOwner) external {
        require(dids[_did].owner == msg.sender, "Only owner can transfer DID");
        require(_newOwner != address(0), "Invalid address");
        address oldOwner = dids[_did].owner;
        dids[_did].owner = _newOwner;
        dids[_did].timestamp = block.timestamp;
        didTransactions[_did].push(Transaction("TRANSFER", block.timestamp, msg.sender));
        emit DIDTransferred(oldOwner, _newOwner, _did, block.timestamp);
    }

    // Get owner of DID
    function getDIDOwner(string memory _did) external view returns (address) {
        return dids[_did].owner;
    }

    // Get single record
    function getDIDTransaction(string memory _did) external view returns (address owner, uint256 timestamp) {
        DID memory info = dids[_did];
        return (info.owner, info.timestamp);
    }

    // Get transaction history for dashboard
    function getTransactions(string memory _did) external view returns (Transaction[] memory) {
        return didTransactions[_did];
    }
}
