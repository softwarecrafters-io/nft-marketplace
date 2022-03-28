import { BigNumber } from 'ethers';
import { KryptoApez } from '../../typechain-types';
import { ContractConfig, NetworkService } from '../services/networkService';
import { WalletService } from '../services/walletService';
export declare class KryptoApezInteractor {
    private walletService;
    private networkService;
    private contractConfig;
    contract: KryptoApez;
    constructor(walletService: WalletService, networkService: NetworkService, contractConfig: ContractConfig);
    getAllNfts(): import("rxjs").Observable<string[]>;
    mint(tokenUrl: string): import("rxjs").Observable<import("ethers").ContractReceipt>;
    totalSupply(): import("rxjs").Observable<BigNumber>;
    balanceOf(accountAddress: string): import("rxjs").Observable<BigNumber>;
    transfer(addressFrom: string, addressTo: string, tokenId: BigNumber): import("rxjs").Observable<import("ethers").ContractReceipt>;
    private calculateMultiplier;
}
