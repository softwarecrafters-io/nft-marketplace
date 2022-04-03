import React from 'react';
import { Factory } from '../../../../Factory';
import { PetNft } from '../../../../domain/models/models';
import { useParams } from 'react-router';
import { Layout } from '../../shared/components/Layout';
import { PetComponent } from '../../shared/components/PetComponent';
import { DetailsHook } from './DetailsHook';

export const DetailsComponent = () => {
	const { id } = useParams<{ id: string }>();
	const { maybeNFT, currentOffer, onUpdateCurrentOffer, onCreateOffer } = DetailsHook(
		id,
		Factory.getNftService(),
		Factory.getMarketPlaceService()
	);
	const NFTBox = (nft: PetNft) => {
		return (
			<div className={'pet-box'}>
				<PetComponent dna={nft.genes} />
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
					<button onClick={onCreateOffer}>Create Offer</button>
					<input type={'number'} placeholder={'0.01'} onChange={e => onUpdateCurrentOffer(e.target.value)} />
					<span>ETH</span>
				</div>
			</div>
		</Layout>
	);
};
