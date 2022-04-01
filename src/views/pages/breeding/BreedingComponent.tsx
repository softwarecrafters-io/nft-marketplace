import React, { useState } from 'react';
import { ModalPortal } from '../../shared/components/Modal';
import { NFTListComponent } from '../my-doggies/MyDoggiesComponent';
import { Factory } from '../../../Factory';
import { navigationService } from '../../../application-services/NavigationService';
import { Routes } from '../../Routes';
import { PetNft } from '../../../models/models';
import { Layout } from '../../shared/components/Layout';
import { PetComponent } from '../../shared/components/PetComponent';

export const BreedingComponent = () => {
	const { navigate } = navigationService();
	const [hasChooseDad, setHasChooseDad] = useState(false);
	const [hasChooseMum, setHasChooseMum] = useState(false);
	const [dad, setDad] = useState(null as PetNft);
	const [mum, setMum] = useState(null as PetNft);
	const chooseDad = (cat: PetNft) => {
		setDad(cat);
		setHasChooseDad(false);
	};

	const chooseMum = (cat: PetNft) => {
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
					<NFTListComponent
						excludedId={hasChooseDad ? mum?.id : dad?.id}
						onChoose={hasChooseDad ? chooseDad : chooseMum}
					/>
				</ModalPortal>
			);
		}
	};

	const dadComponent = () => {
		if (dad != null) {
			return <PetComponent dna={dad.genes} />;
		}
		return <img src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Krypto/egg.png'} />;
	};

	const mumComponent = () => {
		if (mum != null) {
			return <PetComponent dna={mum.genes} />;
		}
		return <img src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Krypto/egg.png'} />;
	};

	return (
		<Layout>
			<div className={'container'}>
				<h1>Dogs Breeding</h1>
				<div className={'breed-container'}>
					<div className="breed-box" onClick={() => setHasChooseDad(true)}>
						<h3>Sire</h3>
						<h4>This doggy will be the Sire</h4>
						{dadComponent()}
						<h4>Select this dog as a sire</h4>
					</div>
					<div className="breed-box" onClick={() => setHasChooseMum(true)}>
						<h3>Dame</h3>
						<h4>This doggy will be preggers</h4>
						{mumComponent()}
						<h4>Select this dog as a dame</h4>
					</div>
				</div>
				{canBreed() ? <button onClick={breed}>Ok, give then some privacy</button> : null}
				{renderModal()}
			</div>
		</Layout>
	);
};
