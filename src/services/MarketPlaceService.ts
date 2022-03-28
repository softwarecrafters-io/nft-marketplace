import { Offer } from '../models/models';
import { from, map, mergeMap, Subject, tap, zip } from 'rxjs';
import { NFTService } from './NFTService';
import { BigNumber, utils } from 'ethers';
import { MarketPlaceInteractor } from '../contract-interactors/MarketPlaceInteractor';

export class MarketPlaceService {
	offers: Offer[] = [];
	offersBus: Subject<Offer[]> = new Subject<Offer[]>();

	constructor(
		private marketPlaceInteractor: MarketPlaceInteractor,
		private nftService: NFTService,
		private readonly contractAddress: string
	) {}

	buy(offer: Offer) {
		return this.marketPlaceInteractor.buyOffer(offer.price, offer.cat.id).pipe(
			mergeMap(tx => from(tx.wait())),
			mergeMap(_ => this.getAllOffers())
		);
	}

	createOffer(price: number, tokenId: number) {
		const priceInWei = utils.parseEther(price.toString());
		console.log('createOffer', priceInWei.toString(), tokenId);
		return this.nftService.setApprovalForAll(this.contractAddress).pipe(
			mergeMap(_ => this.marketPlaceInteractor.createOffer(priceInWei, tokenId)),
			mergeMap(tx => from(tx.wait())),
			mergeMap(_ => from(this.marketPlaceInteractor.getOfferBy(tokenId))),
			mergeMap(offer =>
				this.nftService
					.getNFTById(offer.tokenId.toNumber())
					.pipe(map(nft => Offer.create(offer.id.toNumber(), offer.price, nft)))
			),
			tap(offer => this.notify(this.offers.concat(offer)))
		);
	}

	getAllOffers() {
		console.log('getAllOffers');
		return this.marketPlaceInteractor.getAllTokenIdsOnSale().pipe(
			tap(v => console.log('tap', v)),
			map(ids => ids.map(id => this.marketPlaceInteractor.getOfferBy(id.toNumber()))),
			mergeMap(requests => zip(...requests)),
			map(offers =>
				offers.map(offer =>
					this.nftService
						.getNFTById(offer.tokenId.toNumber())
						.pipe(map(nft => Offer.create(offer.id.toNumber(), offer.price, nft)))
				)
			),
			mergeMap(requests => zip(...requests)),
			tap(this.notify)
		);
	}

	private notify = (offers: Offer[]) => {
		this.offers = offers;
		this.offersBus.next(offers);
	};
}
