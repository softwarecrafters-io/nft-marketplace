import { BigNumber } from 'ethers';
import { Subject } from 'rxjs';
import { KittyFactory } from '../../typechain-types';
import { ContractConfig, NetworkService } from '../services/networkService';
import { WalletService } from '../services/walletService';
import { BirthEvent } from '../../typechain-types/KittyFactory';
import { DNA } from '../apps/kriptoKitties/views/components/KittiesFactoryComponent';
export declare class KittyFactoryInteractor {
    private walletService;
    private networkService;
    private contractConfig;
    contract: KittyFactory;
    birthBus: Subject<[string, BigNumber, BigNumber, BigNumber, BigNumber, BirthEvent]>;
    constructor(walletService: WalletService, networkService: NetworkService, contractConfig: ContractConfig);
    getValidDNAByOwner(): import("rxjs").Observable<DNA[]>;
    private fromNumberToDna;
    private isValidDNA;
    private range;
    requestNFTBy(id: number): import("rxjs").Observable<KittyFactory.KittyStructOutput>;
    mintKitty(genes: number): import("rxjs").Observable<import("ethers").ContractReceipt>;
    totalSupply(): import("rxjs").Observable<BigNumber>;
    balanceOf(accountAddress: string): import("rxjs").Observable<BigNumber>;
    tokenOfOwnerByIndex(accountAddress: string, index: number): import("rxjs").Observable<BigNumber>;
    transfer(addressFrom: string, addressTo: string, tokenId: BigNumber): import("rxjs").Observable<import("ethers").ContractReceipt>;
    private calculateMultiplier;
}
