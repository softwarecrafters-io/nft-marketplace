import { Route, Switch } from 'react-router';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '../apps/kriptoKitties/Routes';
import { MyKittiesComponent } from './components/MyKittiesComponent';
import { KittiesFactoryComponent } from './components/KittiesFactoryComponent';
import { BreedingComponent } from './components/BreedingComponent';
import { NFTDetailsComponent } from './components/NFTDetails';
import { MarketPlaceComponent } from './components/MarketPlaceComponent';

export function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={Routes.kittiesFactory} children={<KittiesFactoryComponent />} />,
				<Route exact path={Routes.myNfts} children={<MyKittiesComponent />} />,
				<Route path={Routes.myNfts + '/:id'} children={<NFTDetailsComponent />} />,
				<Route exact path={Routes.breading} children={<BreedingComponent />} />
				<Route exact path={Routes.marketPlace} children={<MarketPlaceComponent />} />
			</Switch>
		</BrowserRouter>
	);
}
