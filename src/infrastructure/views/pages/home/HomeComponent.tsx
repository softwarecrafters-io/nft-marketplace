import React from 'react';
import { Layout } from '../../shared/components/Layout';
import { Routes } from '../../Routes';
import { navigationService } from '../../application-services/NavigationService';

export const Home = () => {
	const { navigate } = navigationService();

	return (
		<Layout>
			<div className={'container home'}>
				<h1>Krypto CSS Doggies - NFT Marketplace</h1>
				<button onClick={() => navigate(Routes.creation)}>Create your own</button>
				<div className={'image-home'}>
					<img src="https://swcrafters.fra1.digitaloceanspaces.com/Krypto/kripto%20doggies.png" alt="home" />
				</div>
			</div>
		</Layout>
	);
};
