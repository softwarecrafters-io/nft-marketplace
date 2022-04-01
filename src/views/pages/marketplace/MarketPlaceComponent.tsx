import * as React from 'react';
import { Factory } from '../../../Factory';
import { useEffect, useRef, useState } from 'react';
import { Layout } from '../../shared/components/Layout';
import { WalletService } from '../../../application-services/walletService';
import { MarketPlaceService } from '../../../services/MarketPlaceService';
import { ethereumLogoSvg } from '../../assets/images/ethereumLogo.svg';
import { Offer } from '../../../models/models';
import { PetComponent } from '../../shared/components/PetComponent';

export const MarketPlaceComponent = () => {
	const { offers, onBuy } = marketPlaceHook(Factory.getWalletService(), Factory.getMarketPlaceService());
	const fromCatToComponent = () =>
		offers.map((offer, i) => (
			<div className={'pet-box'} key={i}>
				<PetComponent key={i} dna={offer.nft.genes} />
				<div className={'dna'}>
					<span>GEN: {offer.nft.generation}</span>
					<span>DNA: {offer.nft.genes}</span>
				</div>
				<div className={'offer'}>
					<span className={'price'}>
						{ethereumLogoSvg()} {offer.priceInEther()}
					</span>
					<button onClick={() => onBuy(offer)}>Buy</button>
				</div>
			</div>
		));

	return (
		<Layout>
			<div className={'container'}>
				<h1>MarketPlace </h1>
				<h3>These are the available doggies</h3>
			</div>
			<div className={'my-kitties-container'}>{fromCatToComponent()}</div>
		</Layout>
	);
};

export const marketPlaceHook = (walletService: WalletService, marketPlaceService: MarketPlaceService) => {
	const [offers, updateOffers] = useState(marketPlaceService.offers);

	useEffect(() => {
		if (canMakeRequest) {
			marketPlaceService.getAllOffers().subscribe();
		}
		marketPlaceService.offersBus.subscribe(updateOffers);
	}, []);

	const canMakeRequest = walletService.isValidNetwork() && walletService.isConnected();

	const onBuy = (offer: Offer) => marketPlaceService.buy(offer).subscribe();

	return {
		offers,
		onBuy,
	};
};
