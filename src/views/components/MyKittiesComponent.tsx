import * as React from 'react';
import { CatComponent } from './CatComponent';
import { Factory } from '../../Factory';
import { useEffect, useRef, useState } from 'react';
import { mergeMap, of } from 'rxjs';
import { navigationService } from '../../application-services/NavigationService';
import { Routes } from '../../apps/kriptoKitties/Routes';
import { Cat } from '../../models/models';
import { Layout } from './shared/Layout';

export const MyKittiesComponent = () => {
	const { navigate } = navigationService();
	return (
		<Layout>
			<div className={'container'}>
				<h1>Krypto CSS Kitties - My Kitties</h1>
				<h3>These are your custom Kitties</h3>
				<button onClick={() => navigate(Routes.breading)}>Breed Kitties</button>
			</div>
			<MyKittiesListComponent />
		</Layout>
	);
};

export const MyKittiesListComponent = (props: { excludedId?: number; onChoose?: (cat: Cat) => void }) => {
	const [cats, updateCats] = useState([] as Cat[]);
	const { navigate } = navigationService();
	const walletService = Factory.getWalletService();

	useEffect(() => {
		const account = walletService.getAccount();
		const nftService = Factory.getNftService();
		const canMakeRequest = walletService.isValidNetwork() && walletService.isConnected();
		if (canMakeRequest) {
			nftService.getCatsWithValidDNAByOwner(account).subscribe(updateCats);
		}
		walletService
			.getAccountBus()
			.pipe(
				mergeMap(account =>
					walletService.isValidNetwork() ? nftService.getCatsWithValidDNAByOwner(account) : of([])
				)
			)
			.subscribe(updateCats);
	}, []);

	const isNotValidNetwork = cats.length === 0 && !walletService.isValidNetwork();
	if (isNotValidNetwork) {
		console.log('Network is not valid');
	}

	const fromCatToComponent = () =>
		cats
			.filter(c => c.id != props.excludedId)
			.map((cat, i) => (
				<div
					className={'cat-box'}
					key={i}
					onClick={() => (props.onChoose ? props.onChoose(cat) : navigate(Routes.nftDetailsBy(cat.id)))}
				>
					<CatComponent key={i} dna={cat.genes} />
					<div className={'dna'}>
						<span>GEN: {cat.generation}</span>
						<span>DNA: {cat.genes}</span>
					</div>
				</div>
			));

	return <div className={'my-kitties-container'}>{fromCatToComponent()}</div>;
};
