import { Route, Switch } from 'react-router';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { MyDoggiesComponent } from './pages/my-doggies/MyDoggiesComponent';
import { CreationComponent } from './pages/creation/CreationComponent';
import { BreedingComponent } from './pages/breeding/BreedingComponent';
import { DetailsComponent } from './pages/details/DetailsComponent';
import { MarketPlaceComponent } from './pages/marketplace/MarketPlaceComponent';
import { Home } from './pages/home/HomeComponent';

export function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={Routes.home} children={<Home />} />,
				<Route exact path={Routes.creation} children={<CreationComponent />} />,
				<Route exact path={Routes.myNfts} children={<MyDoggiesComponent />} />,
				<Route path={Routes.myNfts + '/:id'} children={<DetailsComponent />} />,
				<Route exact path={Routes.breading} children={<BreedingComponent />} />
				<Route exact path={Routes.marketPlace} children={<MarketPlaceComponent />} />
			</Switch>
		</BrowserRouter>
	);
}
