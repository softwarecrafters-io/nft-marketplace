import { BaseContract, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers/src.ts/json-rpc-provider';

export class ContractConfig {
	private constructor(readonly address: string, readonly contractMetadata: { abi: any }) {}

	static create(address: string, contractMetadata: { abi: any }) {
		return new ContractConfig(address, contractMetadata);
	}
}

export class ContractConnector {
	private constructor(private rpcProvider: JsonRpcProvider) {}

	static create(jsonRpcProvider: JsonRpcProvider) {
		return new ContractConnector(jsonRpcProvider);
	}

	connect<T extends BaseContract>(config: ContractConfig): T {
		if (this.rpcProvider.getSigner() != null) {
			return new ethers.Contract(config.address, config.contractMetadata.abi, this.rpcProvider.getSigner()) as T;
		}
		return new ethers.Contract(config.address, config.contractMetadata.abi, this.rpcProvider) as T;
	}
}
