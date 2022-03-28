import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MetamaskComponent } from '../MetamaskComponent';
import { Routes } from '../../../apps/kriptoKitties/Routes';

export const Layout = (props: { children: ReactNode }) => {
	return (
		<div className={'app'}>
			<div className={'header-nav'}>
				<span>Krypto CSS Kitties - NFT Marketplace</span>
				<div className={'navigation'}>
					<Link to={Routes.marketPlace}>Marketplace</Link>
					<span>|</span>
					<Link to={Routes.kittiesFactory}>Kitties Factory</Link>
					<span>|</span>
					<Link to={Routes.myNfts}>My Kitties</Link>
				</div>
				<MetamaskComponent />
			</div>
			<div className={'content'}>{props.children}</div>
		</div>
	);
};
