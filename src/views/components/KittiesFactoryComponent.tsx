import React from 'react';

import '../../apps/kriptoKitties/index.scss';
import { Factory } from '../../Factory';
import { CatComponent } from './CatComponent';
import { KittiesFactoryHook } from '../hooks/KittiesFactoryHook';
import { Layout } from './shared/Layout';

type CssVariables =
	| '--headChestColor'
	| '--mouthBodyTailColor'
	| '--eyeColor'
	| '--earPawColor'
	| '--eyeBorderBottom'
	| '--eyeBorderTop'
	| '--eyeHeight'
	| '--decorationTransform'
	| '--decorationMiddleColor'
	| '--decorationSideColor'
	| '--animationHead'
	| '--animationLeftEar'
	| '--animationRightEar'
	| '--animationTail';

export type DNA = [number, number, number, number, number, number, number, number, number];

export class CssEditor {
	setVar(name: CssVariables, value: string) {
		document.documentElement.style.setProperty(name, value);
	}
	getVar(name: CssVariables) {
		return getComputedStyle(document.documentElement).getPropertyValue(name);
	}
}

export const KittiesFactoryComponent = () => {
	const initialDna: DNA = [10, 11, 12, 10, 1, 1, 14, 14, 1];
	const { queries, commands } = KittiesFactoryHook(initialDna, Factory.getWalletService(), Factory.getNftService());
	return (
		<Layout>
			<div className="container">
				<h1>Krypto CSS Kitties - Factory</h1>
				<h3>Create your custom Kitty</h3>
				<div className="cat-editor">
					<div className="cat-box">
						<CatComponent dna={queries.dna} />
						<div className={'dna'}>
							<span>{queries.dnaFormatted}</span>
						</div>
					</div>
					<div className="cat-colors">
						<div style={{ display: 'flex' }}>
							<button onClick={() => commands.setIsColorsView(true)}>Colors</button>
							<button onClick={() => commands.setIsColorsView(false)}>Attributes</button>
						</div>
						<div hidden={!queries.isColorsView}>
							<div className="form-group">
								<div className="header-group">
									<b>Head | Body</b>
									<span>Code: {queries.dna[0]}</span>
								</div>
								<input
									type="range"
									min="10"
									max="98"
									value={queries.dna[0]}
									onChange={e => commands.handleHeadChestColor(Number.parseInt(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Mouth | Belly | Tail</b>
									<span>Code: {queries.dna[1]}</span>
								</div>
								<input
									type="range"
									min="10"
									max="98"
									value={queries.dna[1]}
									onChange={e => commands.handleMouthBodyTailColor(Number.parseInt(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Eyes color</b>
									<span>Code: {queries.dna[2]}</span>
								</div>
								<input
									type="range"
									min="10"
									max="98"
									value={queries.dna[2]}
									onChange={e => commands.handleEyeColor(Number.parseInt(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Ears | Paw</b>
									<span>Code: {queries.dna[3]}</span>
								</div>
								<input
									type="range"
									min="10"
									max="98"
									value={queries.dna[3]}
									onChange={e => commands.handleEarPawColor(Number.parseInt(e.target.value))}
								/>
							</div>
						</div>
						<div hidden={queries.isColorsView}>
							<div className="form-group">
								<div className="header-group">
									<b>Eye Shape</b>
									<span>Code: {queries.dna[4]}</span>
								</div>
								<input
									type="range"
									min="1"
									max="4"
									value={queries.dna[4]}
									onChange={e => commands.handleEyeShapeColor(Number.parseInt(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Decoration pattern</b>
									<span>Code: {queries.dna[5]}</span>
								</div>
								<input
									type="range"
									min="1"
									max="5"
									value={queries.dna[5]}
									onChange={e => commands.handleDecorationPattern(Number.parseInt(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Decoration Middle color</b>
									<span>Code: {queries.dna[6]}</span>
								</div>
								<input
									type="range"
									min="10"
									max="98"
									value={queries.dna[6]}
									onChange={e =>
										commands.handleDecorationMiddleColor(Number.parseInt(e.target.value))
									}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Decoration Sides color</b>
									<span>Code: {queries.dna[7]}</span>
								</div>
								<input
									type="range"
									min="10"
									max="98"
									value={queries.dna[7]}
									onChange={e => commands.handleDecorationSideColor(Number.parseInt(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<div className="header-group">
									<b>Animation</b>
									<span>Code: {queries.dna[8]}</span>
								</div>
								<input
									type="range"
									min="1"
									max="5"
									value={queries.dna[8]}
									onChange={e => commands.handleAnimation(Number.parseInt(e.target.value))}
								/>
							</div>
						</div>
					</div>
					<div style={{ display: 'flex' }}>
						<button onClick={commands.generateDefaultDna}>Default</button>
						<button onClick={commands.generateRandomDna}>Random</button>
						<button onClick={commands.mintKitty}>Create</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};
