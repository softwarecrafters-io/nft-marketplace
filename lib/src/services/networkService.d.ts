import { BaseContract } from 'ethers';
import { EIP1193Provider } from './walletService';
export declare class ContractConfig {
    readonly address: string;
    readonly contractMetadata: {
        abi: any;
    };
    private constructor();
    static create(address: string, contractMetadata: {
        abi: any;
    }): ContractConfig;
}
export declare class NetworkService {
    private wallet;
    private provider;
    private constructor();
    static create(provider?: EIP1193Provider): NetworkService;
    connectContract<T extends BaseContract>(config: ContractConfig): T;
}
