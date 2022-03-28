//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./KittyFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketPlace is Ownable{
    uint constant minimumPrice = 0.01 ether;
    KittyFactory private _kittyContract;
    struct Offer {
        uint256 id;
        address payable seller;
        uint256 price;
        uint256 tokenId;
        bool active;
    }
    Offer[] public offers;
    mapping (uint256 => uint256) tokenIdToOfferIndex;

    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    constructor(address kittyContractAddress){
        setKittyContract(kittyContractAddress);
    }

    function setKittyContract(address kittyContractAddress) public onlyOwner{
        _kittyContract = KittyFactory(kittyContractAddress);
    }

    function getAllTokenIdsOnSale() public view returns(uint256[] memory listOfTokenIds){
        uint256 totalOffers = offers.length;
        if (totalOffers == 0) {
            return new uint256[](0);
        }
        uint256 activeOffers = numberOfTotalActiveOffers(totalOffers);
        uint256[] memory tokenIdsOnSale = new uint256[](activeOffers);
        uint offerId;
        uint index;
        while(offerId < totalOffers){
            if(offers[offerId].active == true){
                tokenIdsOnSale[index] = offers[offerId].tokenId;
                index++;
            }
            offerId++;
        }
        return tokenIdsOnSale;
    }

    function numberOfTotalActiveOffers(uint totalOffers) private view returns(uint256){
        uint256 offerIndex;
        uint256 activeOffersCounter;
        while(offerIndex < totalOffers){
            if(offers[offerIndex].active == true){
                activeOffersCounter += 1;
            }
            offerIndex++;
        }
        return activeOffersCounter;
    }

    function createOffer(uint256 price, uint256 tokenId) public{
        require(price >=  minimumPrice, "NFT price should be equal or greater than 0.01");
        require(_kittyContract.ownerOf(tokenId) == msg.sender, 'you are not the owner of the nft');
        //require(tokenIdToOffer[tokenId].active == false, 'Can not sell inactive offer');
        //_kittyContract.approve(address(this), tokenId);
        uint256 offerId = offers.length;
        Offer memory offer = Offer({
            id: offerId,
            seller: payable(msg.sender),
            price: price,
            active: true,
            tokenId: tokenId
        });
        tokenIdToOfferIndex[tokenId] = offerId;
        offers.push(offer);
        emit MarketTransaction('Create offer', msg.sender, tokenId);
    }

    function getOffer(uint256 tokenId) public view returns (Offer memory) {
        Offer storage offer = offers[tokenIdToOfferIndex[tokenId]];
        require(offer.seller != address(0), 'This token has not have any offer');
        return (offer);
    }

    function removeOffer(uint256 tokenId) public {
        require(_kittyContract.ownerOf(tokenId) == msg.sender, 'you are not the owner of the nft');
        _removeOffer(tokenId);
        emit MarketTransaction('Remove offer', msg.sender, tokenId);
    }

    function _removeOffer(uint256 tokenId) private{
        offers[tokenIdToOfferIndex[tokenId]].active = false;
        delete tokenIdToOfferIndex[tokenId];
    }

    function buyNft(uint256 tokenId) public payable{
        Offer memory offer = offers[tokenIdToOfferIndex[tokenId]];
        require(msg.value == offer.price, "The price is not correct");
        require(offer.active == true, 'No active order present');
        _removeOffer(tokenId);
        _kittyContract.transferFrom(offer.seller, msg.sender, tokenId);
        emit MarketTransaction("Buy", msg.sender, tokenId);
    }
}
