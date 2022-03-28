/// <reference types="react" />
import { WalletService } from '../../../../services/walletService';
import { KittyFactoryInteractor } from '../../../../contract-interactors/KittyFactoryInteractor';
import { DNA } from '../components/KittiesFactoryComponent';
export declare const KittiesFactoryHook: (initialDna: DNA, walletService: WalletService, kittyFactoryInteractor: KittyFactoryInteractor) => {
    queries: {
        dnaFormatted: string;
        isColorsView: boolean;
        dna: DNA;
    };
    commands: {
        handleHeadChestColor: (value: number) => void;
        handleMouthBodyTailColor: (value: number) => void;
        handleEyeColor: (value: number) => void;
        handleEarPawColor: (value: number) => void;
        handleEyeShapeColor: (value: number) => void;
        handleDecorationPattern: (value: number) => void;
        handleDecorationMiddleColor: (value: number) => void;
        handleDecorationSideColor: (value: number) => void;
        handleAnimation: (value: number) => void;
        generateDefaultDna: () => void;
        generateRandomDna: () => void;
        setIsColorsView: import("react").Dispatch<import("react").SetStateAction<boolean>>;
        mintKitty: () => import("rxjs").Subscription;
    };
};
