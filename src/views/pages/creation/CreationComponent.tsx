import React from 'react';
import { Factory } from '../../../Factory';
import { CreationHook } from './CreationHook';
import { Layout } from '../../shared/components/Layout';
import { PetComponent } from '../../shared/components/PetComponent';
import { DNA } from '../../../models/TypeAliases';

export const CreationComponent = () => {
	const initialDna: DNA = [10, 11, 12, 10, 1, 1, 14, 14, 1];
	const { queries, commands } = CreationHook(initialDna, Factory.getWalletService(), Factory.getNftService());
	return (
		<Layout>
			<div className="container">
				<h1>Krypto CSS Doggy - Creation</h1>
				<h3>Create your custom Doggy</h3>
				<div className="pet-editor">
					<div style={{ display: 'flex' }}>
						<div className="pet-box">
							<PetComponent dna={queries.dna} />
							<div className={'dna'}>
								<span>{queries.dnaFormatted}</span>
							</div>
						</div>
						<div className="pet-colors">
							<div style={{ display: 'none' }}>
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
										onChange={e =>
											commands.handleMouthBodyTailColor(Number.parseInt(e.target.value))
										}
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
										onChange={e =>
											commands.handleDecorationPattern(Number.parseInt(e.target.value))
										}
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
										onChange={e =>
											commands.handleDecorationSideColor(Number.parseInt(e.target.value))
										}
									/>
								</div>
							</div>
							<div hidden={queries.isColorsView}>
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
