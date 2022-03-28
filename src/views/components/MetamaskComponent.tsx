import { Factory } from '../../Factory';
import { WalletService } from '../../application-services/walletService';
import * as React from 'react';
import { useEffect } from 'react';
import { navigationService } from '../../application-services/NavigationService';

export const MetamaskComponent = () => {
	const navService = navigationService();
	const { accounts, onLogin, mustDisplayLogin, mustDisplayAccount, mustDisplayInvalidNetwork } = metamaskHook(
		Factory.getWalletService()
	);

	if (mustDisplayInvalidNetwork()) {
		return <span>Invalid Network</span>;
	}

	if (mustDisplayLogin()) {
		return <button onClick={onLogin}>Connect Wallet</button>;
	}

	if (mustDisplayAccount()) {
		return <span>{accounts}</span>;
	}

	return (
		<button
			onClick={() =>
				navService.navigateExternal(
					'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
				)
			}
		>
			Install Metamask
		</button>
	);
};

const metamaskHook = (metamaskService: WalletService) => {
	const [accounts, setAccounts] = React.useState(metamaskService.getAccount());
	useEffect(() => {
		metamaskService.getAccountBus().subscribe(setAccounts);
	});
	const onLogin = () => metamaskService.requestAccounts().subscribe();
	const mustDisplayLogin = () => metamaskService.hasWallet() && !metamaskService.isConnected();
	const mustDisplayAccount = () => metamaskService.isConnected();
	const mustDisplayInvalidNetwork = () => !metamaskService.isValidNetwork();
	return {
		accounts,
		onLogin,
		mustDisplayLogin,
		mustDisplayAccount,
		mustDisplayInvalidNetwork,
	};
};
