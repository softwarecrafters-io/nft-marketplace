import { BigNumber, utils } from 'ethers';
import { from, Subject } from 'rxjs';
import { NFTMarketPlace } from '../../typechain-types';
import { ContractConfig, ContractConnector } from '../application-services/contractConnector';

export type MarketTransaction = {
	type: 'Create offer' | 'Remove offer' | 'Buy';
	address: string;
	tokenId: number;
};

export class MarketPlaceInteractor {
	contractAPI: NFTMarketPlace;
	marketTransactionBus: Subject<MarketTransaction> = new Subject();

	constructor(private contractConnector: ContractConnector, private contractConfig: ContractConfig) {
		this.contractAPI = contractConnector.connect(contractConfig);
		this.contractAPI.on(this.contractAPI.filters.MarketTransaction(), (...values) =>
			this.marketTransactionBus.next({
				type: values[0] as MarketTransaction['type'],
				address: values[1],
				tokenId: values[2].toNumber(),
			})
		);
	}

	buyOffer(price: BigNumber, tokenId: number) {
		return from(
			this.contractAPI.buyNft(tokenId, {
				value: price,
			})
		);
	}

	createOffer(price: BigNumber, tokenId: number) {
		return from(this.contractAPI.createOffer(price, tokenId));
	}

	removeOffer(tokenId: number) {
		return from(this.contractAPI.removeOffer(tokenId));
	}

	getAllTokenIdsOnSale() {
		return from(this.contractAPI.getAllTokenIdsOnSale());
	}

	getOfferBy = (id: number) => {
		return from(this.contractAPI.getOffer(id));
	};
}
