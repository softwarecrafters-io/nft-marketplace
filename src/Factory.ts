import { EIP1193Provider, WalletService } from './application-services/walletService';
import { ContractConfig, ContractConnector } from './application-services/contractConnector';
import KittyFactoryMetadata from '../artifacts/contracts/NFTCore.sol/NFTCore.json';
import MarketPlaceMetadata from '../artifacts/contracts/NFTMarketPlace.sol/NFTMarketPlace.json';
import { NFTInteractor } from './contract-interactors/NFTInteractor';
import { ethers } from 'ethers';
import { Maybe } from 'monet';
import { NetworkService } from './application-services/NetworkService';
import { NFTService } from './services/NFTService';
import { MarketPlaceService } from './services/MarketPlaceService';
import { MarketPlaceInteractor } from './contract-interactors/MarketPlaceInteractor';

export class Factory {
	static readonly nftCoreAddress = '0x544D64fEED5F0DCf9162112B720cD981A3454071';
	static readonly marketPlaceAddress = '0xB80E3d0A733fb84A2244B0A0e972B3eDb930b1f4';
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
			const configContract = ContractConfig.create(this.nftCoreAddress, KittyFactoryMetadata);
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
			const configContract = ContractConfig.create(this.marketPlaceAddress, MarketPlaceMetadata);
			return new MarketPlaceInteractor(this.getContractConnector(), configContract);
		}
		return this.marketPlaceInteractor;
	}

	static getMarketPlaceService() {
		if (this.marketPlaceService == null) {
			return new MarketPlaceService(
				this.getMarketPlaceInteractor(),
				this.getNftService(),
				this.marketPlaceAddress
			);
		}
		return this.marketPlaceService;
	}
}
