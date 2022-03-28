/// <reference types="react" />
import { DNA } from './KittiesFactoryComponent';
declare type ColorsRecord = {
    10: string;
};
export declare class Cat {
    private dna;
    private colors;
    private constructor();
    static create(genes: DNA, colors: ColorsRecord): Cat;
    colorOfBodyParts(): {
        headChestColor: string;
        mouthBodyTailColor: string;
        eyeColor: string;
        earPawColor: string;
        decorationMiddleColor: string;
        decorationSideColor: string;
    };
    eyeShape(): {
        background: string;
        height: string;
        borderTopWidth: string;
        borderBottomWidth: string;
    };
    decoration(): {
        middleStyle: {
            background: string;
            transform: string;
        };
        sideStyle: {
            background: string;
            transform: string;
        };
    };
    headStyle(): {
        background: string;
    } | {
        animation: string;
        background: string;
    };
    tailStyle(): {
        background: string;
    } | {
        animation: string;
        background: string;
    };
    rightEarStyle(): {
        background: string;
    } | {
        animation: string;
        background: string;
    };
    leftEarStyle(): {
        background: string;
    } | {
        animation: string;
        background: string;
    };
}
export declare const CatComponent: (props: {
    dna: DNA;
}) => JSX.Element;
export {};
