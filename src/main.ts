import { Factory } from './Factory';
import { EthereumProvider } from 'hardhat/types';
import { render } from './views';

export function start() {
	Factory.setBrowserProvider((window as any).ethereum as EthereumProvider);
	Factory.getWalletService().requestAccounts().subscribe({ next: render, error: console.error });
}

start();
