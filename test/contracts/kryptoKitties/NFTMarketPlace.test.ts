import hre from 'hardhat';
import { KittyFactory as NFT, NFTMarketPlace } from '../../../typechain-types';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { utils } from 'ethers';

describe('The NFT MarketPlace', () => {
	let nft: NFT;
	let marketPlace: NFTMarketPlace;

	beforeEach(async () => {
		//Deploy nft
		const nftContract = await hre.ethers.getContractFactory('KittyFactory');
		nft = (await nftContract.deploy()) as NFT;
		await nft.deployed();
		//Deploy marketplace
		const marketPlaceContract = await ethers.getContractFactory('NFTMarketPlace');
		marketPlace = (await marketPlaceContract.deploy(nft.address)) as NFTMarketPlace;
		await marketPlace.deployed();
		//Approve marketplace as operator
		await nft.setApprovalForAll(marketPlace.address, true);
	});

	describe('when creates an offer for a given token', () => {
		let signers: SignerWithAddress[] = [];
		let owner: SignerWithAddress;

		beforeEach(async () => {
			signers = await ethers.getSigners();
			owner = signers[0];
			const dna = 101112101114141;
			await nft.mintGenerationZeroKitty(dna);
			await nft.mintGenerationZeroKitty(dna);
			await nft.mintGenerationZeroKitty(dna);
		});

		it('registers an offer properly', async () => {
			const priceInWei = utils.parseEther('0.01');
			const tokenId = 1;
			const tx = await marketPlace.createOffer(priceInWei, tokenId);
			await tx.wait();
			const result = await marketPlace.getOffer(tokenId);
			expect(result.seller).to.equal(owner.address);
			expect(result.price).to.equal(priceInWei);
			expect(result.tokenId).to.equal(tokenId);
		});

		it('increases an offers collection with properly id', async () => {
			const priceInWei = utils.parseEther('0.01');
			await marketPlace.createOffer(priceInWei, 1);
			await marketPlace.createOffer(priceInWei, 2);
			await marketPlace.createOffer(priceInWei, 3);
			await marketPlace.removeOffer(2);
			const result = await marketPlace.getAllTokenIdsOnSale();
			expect(result.map(n => n.toNumber())).to.eql([1, 3]);
		});

		it('is not allowed when selling price is lower than 0.01 ethers', async () => {
			const priceInWei = utils.parseEther('0.009');
			const createOffer = marketPlace.createOffer(priceInWei, 1);

			await expect(createOffer).to.be.revertedWith('NFT price should be equal or greater than 0.01');
		});

		it('is not allowed if the signer is not the owner', async () => {
			const priceInWei = utils.parseEther('0.01');
			const createOffer = marketPlace.connect(signers[1]).createOffer(priceInWei, 1);

			await expect(createOffer).to.be.revertedWith('you are not the owner of the nft');
		});

		it('emits market transaction event', async () => {
			const priceInWei = utils.parseEther('0.01');
			const createOffer = await marketPlace.createOffer(priceInWei, 1);

			await expect(createOffer)
				.to.emit(marketPlace, 'MarketTransaction')
				.withArgs('Create offer', owner.address, 1);
		});

		xit('emits approval event in nft contract', async () => {
			const priceInWei = utils.parseEther('0.01');
			const createOffer = await marketPlace.createOffer(priceInWei, 0);

			await expect(createOffer).to.emit(nft, 'Approval').withArgs(owner.address, marketPlace.address, 0);
		});
	});

	describe('when removes an offer for a given token', () => {
		let signers: SignerWithAddress[] = [];
		let owner: SignerWithAddress;
		const tokenId = 1;

		beforeEach(async () => {
			signers = await ethers.getSigners();
			owner = signers[0];
			const dna = 101112101114141;
			await nft.mintGenerationZeroKitty(dna);
			await nft.mintGenerationZeroKitty(dna);
			const priceInWei = utils.parseEther('0.01');
			await marketPlace.createOffer(priceInWei, tokenId);
		});

		it('unregisters an offer properly', async () => {
			const tx = await marketPlace.removeOffer(tokenId);
			await tx.wait();

			const getOffer = await marketPlace.getOffer(tokenId);
			expect(getOffer.active).to.equal(false);
			//await expect(getOffer).to.be.revertedWith('This token has not have any offer');
		});

		it('decreases an offers collection', async () => {
			await marketPlace.removeOffer(tokenId);

			const numberOfOffers = (await marketPlace.getAllTokenIdsOnSale()).length;
			expect(numberOfOffers).to.equal(0);
		});

		it('is not allowed if the signer is not the owner', async () => {
			const removeOffer = marketPlace.connect(signers[1]).removeOffer(tokenId);

			await expect(removeOffer).to.be.revertedWith('you are not the owner of the nft');
		});

		it('emits market transaction event', async () => {
			const removeOffer = await marketPlace.removeOffer(tokenId);

			await expect(removeOffer)
				.to.emit(marketPlace, 'MarketTransaction')
				.withArgs('Remove offer', owner.address, tokenId);
		});
	});

	describe('when someone buy a nft for a given token id', () => {
		let signers: SignerWithAddress[] = [];
		let owner: SignerWithAddress;
		const tokenId = 1;
		const priceInWei = utils.parseEther('0.01');

		beforeEach(async () => {
			signers = await ethers.getSigners();
			owner = signers[0];
			const dna = 101112101114141;
			await nft.mintGenerationZeroKitty(dna);
			await marketPlace.createOffer(priceInWei, tokenId);
		});

		it('removes the offer', async () => {
			await marketPlace.connect(signers[1]).buyNft(tokenId, {
				value: priceInWei,
			});

			const getOffer = await marketPlace.getOffer(tokenId);
			expect(getOffer.active).to.equal(false);

			//await expect(getOffer).to.be.revertedWith('This token has not have any offer');
		});

		it('is not allowed for incorrect given price', async () => {
			const buyNftWithInvalidPrice = marketPlace.connect(signers[1]).buyNft(tokenId, {
				value: ethers.utils.parseEther('0.009'),
			});

			await expect(buyNftWithInvalidPrice).to.be.revertedWith('The price is not correct');
		});

		it('is not allowed for non active offer', async () => {
			await marketPlace.removeOffer(tokenId);
			const buyNftWithNonActiveOffer = marketPlace.connect(signers[1]).buyNft(tokenId, {
				value: priceInWei,
			});

			await expect(buyNftWithNonActiveOffer).to.be.revertedWith('No active order present');
		});

		it('emits market transaction event', async () => {
			const buyNft = await marketPlace.connect(signers[1]).buyNft(tokenId, {
				value: priceInWei,
			});

			await expect(buyNft).to.emit(marketPlace, 'MarketTransaction').withArgs('Buy', signers[1].address, tokenId);
		});

		it('transfers ownership', async () => {
			await marketPlace.connect(signers[1]).buyNft(tokenId, {
				value: priceInWei,
			});

			const newOwnerAddress = await nft.ownerOf(tokenId);
			expect(newOwnerAddress).to.equal(signers[1].address);
		});
	});
});
