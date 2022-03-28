import React, { useEffect, useState } from 'react';
import { NFTService } from '../../services/NFTService';
import { Factory } from '../../Factory';
import { CatComponent } from './CatComponent';
import { Cat, Offer } from '../../models/models';
import { Maybe, Nothing } from 'monet';
import { useParams } from 'react-router';
import { Layout } from './shared/Layout';
import { MarketPlaceService } from '../../services/MarketPlaceService';

export const NFTDetailsComponent = () => {
	const { id } = useParams<{ id: string }>();
	const { maybeNFT, currentOffer, onUpdateCurrentOffer, onCreateOffer } = NFTDetailsHook(
		id,
		Factory.getNftService(),
		Factory.getMarketPlaceService()
	);
	const NFTBox = (nft: Cat) => {
		return (
			<div className={'cat-box'}>
				<CatComponent dna={nft.genes} />
				<div className={'dna'}>
					<span>GEN: {nft.generation}</span>
					<span>DNA: {nft.genes}</span>
				</div>
			</div>
		);
	};
	const renderNFT = () =>
		maybeNFT.cata(
			() => <div> No NFT </div>,
			nft => NFTBox(nft)
		);

	return (
		<Layout>
			<div className={'container'}>
				{renderNFT()}
				<div className={'offer-input'}>
					<input
						type={'number'}
						placeholder={'Price (ethers)'}
						onChange={e => onUpdateCurrentOffer(e.target.value)}
					/>
					<button onClick={onCreateOffer}>Create Offer</button>
				</div>
			</div>
		</Layout>
	);
};

export function NFTDetailsHook(nftId: string, nftService: NFTService, marketPlaceService: MarketPlaceService) {
	const [maybeNFT, updateMaybeNFT] = useState(Nothing<Cat>());
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
