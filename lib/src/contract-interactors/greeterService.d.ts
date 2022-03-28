import { Greeter } from "../../typechain-types";
import { ContractConfig, NetworkService } from "../services/networkService";
import { WalletService } from "../services/walletService";
export declare class GreeterWrapper {
    private walletService;
    private networkService;
    private contractConfig;
    contract: Greeter;
    constructor(walletService: WalletService, networkService: NetworkService, contractConfig: ContractConfig);
    greet(): import("rxjs").Observable<string>;
    setGreetings(text: string): import("rxjs").Observable<import("ethers").ContractReceipt>;
}
