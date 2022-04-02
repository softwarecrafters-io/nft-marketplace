import * as React from 'react';
import { Factory } from '../../../../Factory';
import { useEffect, useRef, useState } from 'react';
import { mergeMap, of } from 'rxjs';
import { navigationService } from '../../../../application-services/NavigationService';
import { Routes } from '../../Routes';
import { PetNft } from '../../../../domain/models/models';
import { Layout } from '../../shared/components/Layout';
import { PetComponent } from '../../shared/components/PetComponent';

export const MyDoggiesComponent = () => {
	const { navigate } = navigationService();
	return (
		<Layout>
			<div className={'container'}>
				<h1>My Krypto Doggies</h1>
				<h3>These are your custom doggies</h3>
				<button onClick={() => navigate(Routes.breading)}>Breed Doggies</button>
			</div>
			<NFTListComponent />
		</Layout>
	);
};

export const NFTListComponent = (props: { excludedId?: number; onChoose?: (cat: PetNft) => void }) => {
	const [cats, updateCats] = useState([] as PetNft[]);
	const { navigate } = navigationService();
	const walletService = Factory.getWalletService();

	useEffect(() => {
		const account = walletService.getAccount();
		const nftService = Factory.getNftService();
		const canMakeRequest = walletService.isValidNetwork() && walletService.isConnected();
		if (canMakeRequest) {
			nftService.getPetWithValidDNAByOwner(account).subscribe(updateCats);
		}
		walletService
			.getAccountBus()
			.pipe(
				mergeMap(account =>
					walletService.isValidNetwork() ? nftService.getPetWithValidDNAByOwner(account) : of([])
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
					className={'pet-box'}
					key={i}
					onClick={() => (props.onChoose ? props.onChoose(cat) : navigate(Routes.nftDetailsBy(cat.id)))}
				>
					<PetComponent key={i} dna={cat.genes} />
					<div className={'dna'}>
						<span>GEN: {cat.generation}</span>
						<span>DNA: {cat.genes}</span>
					</div>
				</div>
			));

	return <div className={'my-kitties-container'}>{fromCatToComponent()}</div>;
};
