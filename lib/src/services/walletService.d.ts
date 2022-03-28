/// <reference types="node" />
import { Subject } from 'rxjs';
import EventEmitter from 'events';
export declare type EIP1193Provider = EventEmitter & {
    request(args: {
        method: string;
        params?: readonly unknown[] | object;
    }): Promise<unknown>;
};
export declare class WalletService {
    private provider;
    private currentAccount;
    private currentNetwork;
    private accountBus;
    private constructor();
    static create(provider: EIP1193Provider, validChainId: string): WalletService;
    handleAccountsChanged: (event: any) => void;
    hasProvider(): boolean;
    isConnected(): boolean;
    getAccount: () => string;
    getAccountBus(): Subject<string>;
    requestAccounts(): import("rxjs").Observable<string>;
    connectToMetamask(): import("rxjs").Observable<string>;
    private createRequest;
    private handleAccount;
    private handleChainChanged;
    private handleDisconnect;
    private handleConnect;
    private notify;
}
