import { from, map, mergeMap, of, Subject, tap } from 'rxjs';
import EventEmitter from 'events';
import { Maybe } from 'monet';
import { NetworkService } from './NetworkService';

//https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
export type EIP1193Provider = EventEmitter & {
	request(args: { method: string; params?: readonly unknown[] | object }): Promise<unknown>;
};

export class WalletService {
	private currentAccount: string | undefined;
	private currentNetworkId: string | undefined;
	private accountBus: Subject<string> = new Subject();

	constructor(
		private maybeProvider: Maybe<EIP1193Provider>,
		public validChainId: string,
		private networkService: NetworkService
	) {
		maybeProvider.cata(
			() => {
				console.warn('Wallet not detected!');
			},
			provider => {
				provider.on('chainChanged', this.handleChainChanged);
				provider.on('accountsChanged', this.handleAccountsChanged);
				provider.on('disconnect', this.handleDisconnect);
				provider.on('connect', this.handleConnect);
			}
		);
	}

	handleAccountsChanged = (accounts: string[]) => {
		this.notify(accounts);
	};

	hasWallet() {
		return this.maybeProvider.isJust();
	}

	isValidNetwork() {
		console.log('validNetwork', this.currentNetworkId, this.validChainId);
		return this.currentNetworkId === this.validChainId;
	}

	isConnected() {
		console.log('isConnected', this.currentAccount);
		return this.currentAccount != null;
	}

	getAccount = () => {
		return this.currentAccount as string;
	};

	getAccountBus() {
		return this.accountBus;
	}

	requestAccounts = () => {
		return this.networkService.network().pipe(
			tap(network => (this.currentNetworkId = network.chainId.toString())),
			mergeMap(_ => this.createRequest('eth_requestAccounts')),
			map(value => value as string[]),
			tap(value => this.handleAccount(value))
		);
	};

	connectToMetamask() {
		const request = this.createRequest('eth_accounts');
		return request.pipe(
			map(value => value as string[]),
			tap(value => this.handleAccount(value))
		);
	}

	private createRequest(method: 'eth_requestAccounts' | 'eth_accounts') {
		return this.maybeProvider.cata(
			() => of([]),
			provider => from(provider.request({ method }))
		);
	}

	private handleAccount = (accounts: string[]) => {
		this.notify(accounts);
	};

	private handleChainChanged = (chainId: string) => {
		location.reload();
	};

	private handleDisconnect = () => {
		this.notify([]);
	};

	private handleConnect = (event: { chainId: string }) => {
		//this event is not necessary
	};

	private notify = (account: string[]) => {
		this.currentAccount = account[0];
		this.accountBus.next(this.currentAccount as string);
	};
}
