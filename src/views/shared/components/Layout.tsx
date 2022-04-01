import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MetamaskComponent } from './MetamaskComponent';
import { Routes } from '../../Routes';
import { ethereumLogoSvg } from '../../assets/images/ethereumLogo.svg';

export const Layout = (props: { children: ReactNode }) => {
	return (
		<div className={'app'}>
			<div className={'header-nav'}>
				<div className={'logo'}>
					{ethereumLogoSvg()} <Link to={Routes.home}>Krypto CSS Doggies</Link>
				</div>
				<div className={'navigation'}>
					<Link to={Routes.marketPlace}>Marketplace</Link>
					<span>|</span>
					<Link to={Routes.creation}>Doggies Creation</Link>
					<span>|</span>
					<Link to={Routes.myNfts}>My Doggies</Link>
				</div>
				<MetamaskComponent />
			</div>
			<div className={'content'}>{props.children}</div>
		</div>
	);
};
