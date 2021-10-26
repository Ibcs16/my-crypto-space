// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract MyCryptoMusicSpace {
    uint256 private seed;

    uint256 totalRecommendedSongs;

    struct SongRecommendation {
        address from;
        string song;
        uint256 timestamp;
    }

    SongRecommendation[] recommendedSongs;

    // store last time a user sent a recommendation
    mapping(address => uint256) public lastRecommendedAt;

    event NewSongRecommendation(address indexed from, uint256 timestamp, string song);
    
    constructor() payable {
        console.log('This is a my-crypto-space contract');
        seed = (block.difficulty + block.timestamp) % 100;
    }

    function recommendSong(string memory _song) public {

        require(
            lastRecommendedAt[msg.sender] + 30 seconds < block.timestamp,
            "Must wait 30s before recommending another song"
        );

        lastRecommendedAt[msg.sender] = block.timestamp;

        // increase recommended songs
        totalRecommendedSongs++;
        console.log('%s has recommended %s', msg.sender, _song);
        
        // insert new recommendation
        recommendedSongs.push(SongRecommendation(msg.sender, _song, block.timestamp));

        // generate new seed for next user
        seed = (block.difficulty + block.timestamp) % 100;
        
        if(seed <= 50) {
            console.log("%s won!", msg.sender);
            // define prize amount using ethers
            uint256 prizeAmount  = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has");
            (bool success, )  = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract");
        }
        
        // emit event
        emit NewSongRecommendation(msg.sender, block.timestamp, _song);
    }

    function getTotalRecommendedSongs() public view returns (uint256) {
        console.log('We have %d total recommended songs', totalRecommendedSongs);
        return totalRecommendedSongs;
    }

    function getAllRecommendations() public view returns (SongRecommendation[] memory){
        return recommendedSongs;
    }
}