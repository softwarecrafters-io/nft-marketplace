import { ethers } from 'hardhat';
import { NFTCore } from '../typechain-types';
import { expect } from 'chai';

describe('The NFT Core', () => {
	let nft: NFTCore;

	beforeEach(async () => {
		const nftContract = await ethers.getContractFactory('NFTCore');
		nft = (await nftContract.deploy()) as NFTCore;
		await nft.deployed();
	});

	it('has a name', async () => {
		const name = await nft.name();
		expect(name).to.equal('Krypto CSS Doggies');
	});

	it('has a symbol', async () => {
		const symbol = await nft.symbol();
		expect(symbol).to.equal('KCD');
	});

	it('increases owner balance when a new generation zero is minted', async () => {
		const [owner] = await ethers.getSigners();
		const dna = 101112101114141;

		await nft.mintGenerationZero(dna);

		const balance = await nft.balanceOf(owner.address);
		expect(balance).to.equal(1);
	});

	it('increases counter when a new generation zero is minted', async () => {
		const dna = 101112101114141;

		await nft.mintGenerationZero(dna);

		const counter = await nft.generationZeroCounter();
		expect(counter).to.equal(1);
	});

	it('retrieves the address of the owner minting the generation zero token', async () => {
		const [owner] = await ethers.getSigners();
		const dna = 101112101114141;
		const tokenId = 1;

		await nft.mintGenerationZero(dna);

		const address = await nft.ownerOf(tokenId);
		expect(address).to.equal(owner.address);
	});

	it('emits a transfer event when a new nft is minted', async () => {
		const [owner] = await ethers.getSigners();
		const dna = 101112101114141;
		const tokenId = 1;

		const mint = await nft.mintGenerationZero(dna);

		await expect(mint)
			.to.emit(nft, 'Transfer')
			.withArgs('0x0000000000000000000000000000000000000000', owner.address, tokenId);
	});

	it('emits a birth event when a new nft is minted', async () => {
		const [owner] = await ethers.getSigners();
		const dna = 101112101114141;

		const mint = nft.mintGenerationZero(dna);

		await expect(mint).to.emit(nft, 'Birth').withArgs(owner.address, 1, 0, 0, dna);
	});

	xit('is not allowed to mint generation zero nfts when sender is not the owner', async () => {
		const [owner, anotherAccount] = await ethers.getSigners();
		const dna = 101112101114141;

		const mintWithAnotherAccount = nft.connect(anotherAccount).mintGenerationZero(dna);
		await expect(mintWithAnotherAccount).to.be.revertedWith('Ownable: caller is not the owner');
	});

	describe('complies with ERC721 Enumerable specification', () => {
		it('increases total supply when a new generation zero is minted', async () => {
			const dna = 101112101114141;

			await nft.mintGenerationZero(dna);

			const counter = await nft.totalSupply();
			expect(counter).to.equal(1);
		});

		it('gets token by index when a new generation zero is minted', async () => {
			const dna = 101112101114141;

			await nft.mintGenerationZero(dna);

			const tokenId = await nft.tokenByIndex(0);
			expect(tokenId).to.equal(1);
		});

		it('gets token id by owner and index when a new generation zero is minted', async () => {
			const [owner] = await ethers.getSigners();
			const dna = 101112101114141;

			await nft.mintGenerationZero(dna);

			const tokenId = await nft.tokenOfOwnerByIndex(owner.address, 0);
			expect(tokenId).to.equal(1);
		});
	});

	it('gets pet by id', async () => {
		const [owner] = await ethers.getSigners();
		const dna = 101112101114141;

		await nft.mintGenerationZero(dna);

		const kitty = await nft.getPet(0);
		expect(kitty.mumId).to.equal(0);
		expect(kitty.dadId).to.equal(0);
		expect(kitty.generation).to.equal(0);
		expect(kitty.genes).to.equal(101112101114141);
	});

	it('breeds a new pet by mixing the dna of the father and the mother', async () => {
		const dadDna = 101112101114141;
		const mumDna = 303132332234343;

		const newDna = await nft._mixDna(dadDna, mumDna);

		expect(newDna.toNumber()).to.equal(303112132234141);
	});

	it('generates a new dna by mixing the dna of the father and the mother', async () => {
		const dadDna = 101112101114141;
		const mumDna = 303132332234343;

		await nft.mintGenerationZero(dadDna);
		await nft.mintGenerationZero(mumDna);

		const dadId = 1;
		const mumId = 2;
		await nft.breed(dadId, mumId);
		const newPet = await nft.getPet(3);

		expect(newPet.genes.toNumber()).to.equal(303112132234141);
		expect(newPet.dadId).to.equal(dadId);
		expect(newPet.mumId).to.equal(mumId);
		expect(newPet.generation).to.equal(1);
	});

	it('it is not allowed to breed when it is not the owner of the father', async () => {
		const [owner, anotherAccount] = await ethers.getSigners();
		const dadDna = 101112101114141;
		const mumDna = 303132332234343;
		await nft.mintGenerationZero(dadDna);
		await nft.connect(anotherAccount).mintGenerationZero(mumDna);

		const toBreed = nft.connect(anotherAccount).breed(1, 2);

		await expect(toBreed).to.be.revertedWith('Is not the owner of the father');
	});

	it('it is not allowed to breed when it is not the owner of the mather', async () => {
		const [owner, anotherAccount] = await ethers.getSigners();
		const dadDna = 101112101114141;
		const mumDna = 303132332234343;
		await nft.connect(anotherAccount).mintGenerationZero(dadDna);
		await nft.mintGenerationZero(mumDna);

		const toBreed = nft.connect(anotherAccount).breed(1, 2);

		await expect(toBreed).to.be.revertedWith('Is not the owner of the mother');
	});
});
