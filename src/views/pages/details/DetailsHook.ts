import { NFTService } from '../../../domain/services/NFTService';
import { MarketPlaceService } from '../../../domain/services/MarketPlaceService';
import { useEffect, useState } from 'react';
import { Maybe, Nothing } from 'monet';
import { Offer, PetNft } from '../../../domain/models/models';

export function DetailsHook(nftId: string, nftService: NFTService, marketPlaceService: MarketPlaceService) {
	const [maybeNFT, updateMaybeNFT] = useState(Nothing<PetNft>());
	const [currentOffer, updateCurrentOffer] = useState(0);
	const [maybeOffer, updateMaybeOffer] = useState(Nothing<Offer>());

	useEffect(() => {
		const parsedId = Number.parseInt(nftId);
		nftService.getNFTById(parsedId).subscribe(nft => updateMaybeNFT(Maybe.fromNull(nft)));
	}, []);

	const onCreateOffer = () => {
		console.log('oncreateoffer', currentOffer);
		maybeNFT.map(nft => marketPlaceService.createOffer(currentOffer, nft.id).subscribe(console.log));
	};

	const onUpdateCurrentOffer = (price: string) => {
		const parsedPrice = Number.parseFloat(price);
		console.log('onUpdateCurrentOffer', parsedPrice, price);
		updateCurrentOffer(parsedPrice);
	};

	return {
		maybeNFT,
		currentOffer,
		onUpdateCurrentOffer,
		onCreateOffer,
	};
}
