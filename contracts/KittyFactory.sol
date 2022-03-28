//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract KittyFactory is ERC721, ERC721Enumerable, Ownable {
    uint256 _tokenIds;
    uint256 public generationZeroCounter;
    struct Kitty {
        uint256 id;
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    Kitty[] kitties;
    mapping (uint256 => uint256) tokenIdToTokenIndex;
    event Birth(address owner, uint256 kittyId, uint256 mumId, uint256 dadId, uint256 genes);

    constructor() ERC721('Krypto CSS Kitties', 'KCK') {}

    function getKitty(uint256 id) public view returns (Kitty memory){
        uint256 index = tokenIdToTokenIndex[id];
        return kitties[index];
    }

    function mintGenerationZeroKitty(uint256 genes) public {
        generationZeroCounter++;
        mintKitty(0, 0, 0, genes, msg.sender);
    }

    function mintKitty(uint256 dadId, uint256 mumId, uint256 generation, uint256 genes, address owner) private{
        _tokenIds++;
        uint256 newKittenId = _tokenIds;
        Kitty memory kitty = Kitty({
            id:newKittenId,
            genes: genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(mumId),
            dadId: uint32(dadId),
            generation: uint16(generation)
        });
        tokenIdToTokenIndex[newKittenId] = kitties.length;
        kitties.push(kitty);
        _mint(owner, newKittenId);
        emit Birth(owner, newKittenId, uint256(kitty.mumId), uint256(kitty.dadId), kitty.genes);
    }

    function breed(uint256 dadId, uint256 mumId) public {
        require(ownerOf(dadId) == msg.sender, 'Is not the owner of the father');
        require(ownerOf(mumId) == msg.sender, 'Is not the owner of the mother');
        address owner = msg.sender;
        Kitty memory dad = getKitty(dadId);
        Kitty memory mum = getKitty(mumId);
        uint256 newDna = _mixDna(dad.genes, mum.genes);
        uint256 newGeneration = calculateGeneration(dad.generation, mum.generation);
        mintKitty(dadId, mumId, newGeneration, newDna, owner);
    }

    function calculateGeneration(uint256 dadGeneration, uint256 mumGeneration) private pure returns (uint256){
        if(dadGeneration > mumGeneration){
            return dadGeneration + 1;
        }
        return mumGeneration + 1;
    }

    function _mixDna(uint256 dadDna, uint256 mumDna) public pure returns (uint256){
        uint firstQuarterMultiplier = 1000000000000;
        uint secondQuarterMultiplier = 100000000;
        uint thirdQuarterMultiplier = 10000;
        uint newDna1stQuarter = mumDna / firstQuarterMultiplier;
        uint newDna2ndQuarter = (dadDna / secondQuarterMultiplier) % thirdQuarterMultiplier;
        uint newDna3rdQuarter = (mumDna % secondQuarterMultiplier) / thirdQuarterMultiplier;
        uint newDna4thQuarter = dadDna % thirdQuarterMultiplier;

        return (newDna1stQuarter * firstQuarterMultiplier) + (newDna2ndQuarter * secondQuarterMultiplier) + (newDna3rdQuarter * thirdQuarterMultiplier) + newDna4thQuarter;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}