import { BigNumber } from "ethers";
import { BasicToken } from "../../typechain-types";
import { ContractConfig, NetworkService } from "../services/networkService";
import { WalletService } from "../services/walletService";
export declare class BasicTokenWrapper {
    private walletService;
    private networkService;
    private contractConfig;
    contract: BasicToken;
    constructor(walletService: WalletService, networkService: NetworkService, contractConfig: ContractConfig);
    balanceOf(accountAddress: string): import("rxjs").Observable<BigNumber>;
    decimals(): import("rxjs").Observable<number>;
    transfer(to: string, ammount: BigNumber): import("rxjs").Observable<import("ethers").ContractReceipt>;
    private calculateMultiplier;
}
