import { JsonRpcProvider } from '@ethersproject/providers/src.ts/json-rpc-provider';
import { from, map, Observable } from 'rxjs';
import { ethers } from 'ethers';

type NetworkInformation = { name: string; chainId: string };

export class NetworkService {
	constructor(private rpcProvider: JsonRpcProvider) {}

	network(): Observable<NetworkInformation> {
		return from(this.rpcProvider.getNetwork()).pipe(
			map(network => ({ name: network.name, chainId: this.toHex(network.chainId) }))
		);
	}

	toHex(n: number) {
		return ethers.utils.hexValue(n);
	}
}
