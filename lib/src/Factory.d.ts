import { EIP1193Provider, WalletService } from './services/walletService';
import { NetworkService } from './services/networkService';
import { GreeterWrapper } from './contract-interactors/greeterService';
import { BasicTokenWrapper } from './contract-interactors/BasicTokenWrapper';
import { KryptoApezInteractor } from './contract-interactors/KryptoApezInteractor';
import { KittyFactoryInteractor } from './contract-interactors/KittyFactoryInteractor';
export declare class Factory {
    static readonly greeterAddress = "0xE39D73Bc223fA0A306D365f4402BB243A15a3D4e";
    static readonly basicTokenAddress = "0x0a54A68EdF7bf87CB7D2E9fA7Bf2792bb2Bc5934";
    static readonly kryptoAppezAddress = "0xF8Fbb0ADe680f2a913284a7465c277f5c7982Ba6";
    static readonly kittyFactory = "0xC08780280F6122cF5bBf414eB7eEFc0db057f0BD";
    static readonly validChainId = "0x539";
    private static walletService;
    private static networkService;
    private static greeterWrapper;
    private static basicTokenWrapper;
    private static kryptoApezWrapper;
    private static kittyFactoryInteractor;
    private static provider;
    static setProvider(provider: EIP1193Provider): void;
    static getWalletService(): WalletService;
    static getNetworkService(): NetworkService;
    static getGreeterService(): GreeterWrapper;
    static getBasicTokenWrapper(): BasicTokenWrapper;
    static getKryptoApezInteractor(): KryptoApezInteractor;
    static getKittyFactoryInteractor(): KittyFactoryInteractor;
}
