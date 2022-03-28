import React, { useState } from 'react';
import { CatComponent } from './CatComponent';
import { ModalPortal } from './shared/Modal';
import { MyKittiesListComponent } from './MyKittiesComponent';
import { Factory } from '../../Factory';
import { navigationService } from '../../application-services/NavigationService';
import { Routes } from '../../apps/kriptoKitties/Routes';
import { Cat } from '../../models/models';
import { Layout } from './shared/Layout';

export const BreedingComponent = () => {
	const { navigate } = navigationService();
	const [hasChooseDad, setHasChooseDad] = useState(false);
	const [hasChooseMum, setHasChooseMum] = useState(false);
	const [dad, setDad] = useState(null as Cat);
	const [mum, setMum] = useState(null as Cat);
	const chooseDad = (cat: Cat) => {
		setDad(cat);
		setHasChooseDad(false);
	};

	const chooseMum = (cat: Cat) => {
		setMum(cat);
		setHasChooseMum(false);
	};

	const canBreed = () => mum != null && dad != null;
	const breed = () => {
		Factory.getKittyFactoryInteractor()
			.breed(dad.id, mum.id)
			.subscribe(() => navigate(Routes.myNfts));
	};
	const renderModal = () => {
		if (hasChooseDad || hasChooseMum) {
			return (
				<ModalPortal
					isOpened={true}
					onClose={() => (hasChooseDad ? setHasChooseDad(false) : setHasChooseMum(false))}
				>
					<MyKittiesListComponent
						excludedId={hasChooseDad ? mum?.id : dad?.id}
						onChoose={hasChooseDad ? chooseDad : chooseMum}
					/>
				</ModalPortal>
			);
		}
	};

	const dadComponent = () => {
		if (dad != null) {
			return <CatComponent dna={dad.genes} />;
		}
		return <img src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Krypto/egg.png'} />;
	};

	const mumComponent = () => {
		if (mum != null) {
			return <CatComponent dna={mum.genes} />;
		}
		return <img src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Krypto/egg.png'} />;
	};

	return (
		<Layout>
			<div className={'container'}>
				<h1>Cats Breeding</h1>
				<div className={'breed-container'}>
					<div className="breed-box" onClick={() => setHasChooseDad(true)}>
						<h3>Sire</h3>
						<h4>This kitty will be the Sire</h4>
						{dadComponent()}
						<h4>Select this cat as a sire</h4>
					</div>
					<div className="breed-box" onClick={() => setHasChooseMum(true)}>
						<h3>Dame</h3>
						<h4>This kitty will be preggers</h4>
						{mumComponent()}
						<h4>Select this cat as a dame</h4>
					</div>
				</div>
				{canBreed() ? <button onClick={breed}>Ok, give then some privacy</button> : null}
				{renderModal()}
			</div>
		</Layout>
	);
};
