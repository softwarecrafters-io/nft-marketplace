import { ethers } from 'hardhat';

async function main() {
	const CustomNFT = await ethers.getContractFactory('NFTCore');
	const token = await CustomNFT.deploy();
	await token.deployed();
	const MarketPlace = await ethers.getContractFactory('NFTMarketPlace');
	const marketPlace = await MarketPlace.deploy(token.address);
	await marketPlace.deployed();

	console.log('NFT Core Contract Address: ', token.address);
	console.log('Market Place Contract Address: ', marketPlace.address);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
