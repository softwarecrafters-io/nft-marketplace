import * as React from 'react';
import { CatComponent } from './CatComponent';
import { Factory } from '../../Factory';
import { useEffect, useRef, useState } from 'react';
import { Layout } from './shared/Layout';
import { WalletService } from '../../application-services/walletService';
import { MarketPlaceService } from '../../services/MarketPlaceService';
import { ethereumLogoSvg } from '../../assets/images/ethereumLogo.svg';
import { Offer } from '../../models/models';

export const MarketPlaceComponent = () => {
	const { offers, onBuy } = marketPlaceHook(Factory.getWalletService(), Factory.getMarketPlaceService());
	const fromCatToComponent = () =>
		offers.map((offer, i) => (
			<div className={'cat-box'} key={i}>
				<CatComponent key={i} dna={offer.cat.genes} />
				<div className={'dna'}>
					<span>GEN: {offer.cat.generation}</span>
					<span>DNA: {offer.cat.genes}</span>
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
				<h3>These are your custom Kitties</h3>
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
