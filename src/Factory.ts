import { EIP1193Provider, WalletService } from './application-services/walletService';
import { ContractConfig, ContractConnector } from './application-services/contractConnector';
import KittyFactoryMetadata from '../artifacts/contracts/KittyFactory.sol/KittyFactory.json';
import MarketPlaceMetadata from '../artifacts/contracts/NFTMarketPlace.sol/NFTMarketPlace.json';
import { NFTInteractor } from './contract-interactors/NFTInteractor';
import { ethers } from 'ethers';
import { Maybe } from 'monet';
import { NetworkService } from './application-services/NetworkService';
import { NFTService } from './services/NFTService';
import { MarketPlaceService } from './services/MarketPlaceService';
import { MarketPlaceInteractor } from './contract-interactors/MarketPlaceInteractor';

export class Factory {
	static readonly greeterAddress = '0xE39D73Bc223fA0A306D365f4402BB243A15a3D4e';
	static readonly basicTokenAddress = '0x0a54A68EdF7bf87CB7D2E9fA7Bf2792bb2Bc5934';
	static readonly kryptoAppezAddress = '0xF8Fbb0ADe680f2a913284a7465c277f5c7982Ba6';
	static readonly kittyFactory = '0x06AD7aF38AE37C88D084a682894744afE5F42617';
	static readonly marketPlace = '0x61888CC5824106198e09165A2Aa32591CeeD82cd';
	static readonly validChainId = '0x539';
	static readonly nodeUrl = 'http://127.0.0.1:7545';

	private static walletService: WalletService;
	private static networkService: NetworkService;
	private static contractConnector: ContractConnector;
	private static nftInteractor: NFTInteractor;
	private static nftService: NFTService;
	private static marketPlaceService: MarketPlaceService;
	private static maybeBrowserProvider: Maybe<EIP1193Provider>;
	private static marketPlaceInteractor: MarketPlaceInteractor;

	static setBrowserProvider(browserProvider: EIP1193Provider) {
		this.maybeBrowserProvider = Maybe.fromNull(browserProvider);
	}

	static getWalletService() {
		if (this.walletService == null) {
			this.walletService = new WalletService(
				this.maybeBrowserProvider,
				this.validChainId,
				this.getNetworkService()
			);
		}
		return this.walletService;
	}

	static getContractConnector() {
		if (this.contractConnector == null) {
			const jsonRpcProvider = this.maybeBrowserProvider.cata(
				() => new ethers.providers.JsonRpcProvider(this.nodeUrl),
				provider => new ethers.providers.Web3Provider(provider)
			);
			this.contractConnector = ContractConnector.create(jsonRpcProvider);
		}
		return this.contractConnector;
	}

	static getNetworkService() {
		if (this.networkService == null) {
			const jsonRpcProvider = this.maybeBrowserProvider.cata(
				() => new ethers.providers.JsonRpcProvider(this.nodeUrl),
				provider => new ethers.providers.Web3Provider(provider)
			);
			this.networkService = new NetworkService(jsonRpcProvider);
		}
		return this.networkService;
	}

	static getKittyFactoryInteractor() {
		if (this.nftInteractor == null) {
			const configContract = ContractConfig.create(this.kittyFactory, KittyFactoryMetadata);
			this.nftInteractor = new NFTInteractor(this.getContractConnector(), configContract);
		}
		return this.nftInteractor;
	}

	static getNftService() {
		if (this.nftService == null) {
			return new NFTService(this.getKittyFactoryInteractor());
		}
		return this.nftService;
	}

	static getMarketPlaceInteractor() {
		if (this.marketPlaceInteractor == null) {
			const configContract = ContractConfig.create(this.marketPlace, MarketPlaceMetadata);
			return new MarketPlaceInteractor(this.getContractConnector(), configContract);
		}
		return this.marketPlaceInteractor;
	}

	static getMarketPlaceService() {
		if (this.marketPlaceService == null) {
			return new MarketPlaceService(this.getMarketPlaceInteractor(), this.getNftService(), this.marketPlace);
		}
		return this.marketPlaceService;
	}
}
