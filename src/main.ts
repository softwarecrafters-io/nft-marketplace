import { Factory } from './Factory';
import { EthereumProvider } from 'hardhat/types';
import { render } from './infrastructure/views';

export function main() {
	Factory.setBrowserProvider((window as any).ethereum as EthereumProvider);
	Factory.getWalletService().requestAccounts().subscribe({ next: render, error: render });
}

main();
