/// <reference types="react" />
import '../../index.scss';
declare type CssVariables = '--headChestColor' | '--mouthBodyTailColor' | '--eyeColor' | '--earPawColor' | '--eyeBorderBottom' | '--eyeBorderTop' | '--eyeHeight' | '--decorationTransform' | '--decorationMiddleColor' | '--decorationSideColor' | '--animationHead' | '--animationLeftEar' | '--animationRightEar' | '--animationTail';
export declare type DNA = [number, number, number, number, number, number, number, number, number];
export declare class CssEditor {
    setVar(name: CssVariables, value: string): void;
    getVar(name: CssVariables): string;
}
export declare const KittiesFactoryComponent: () => JSX.Element;
export {};
