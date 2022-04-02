import { BigNumber, utils } from 'ethers';
import { NFTCore } from '../../../typechain-types';
import { ColorsRecord, DNA } from './TypeAliases';

export class Offer {
	constructor(readonly id: number, readonly price: BigNumber, readonly nft: PetNft) {}

	static create(id: number, price: BigNumber, petNft: PetNft) {
		return new Offer(id, price, petNft);
	}

	priceInEther() {
		return utils.formatEther(this.price);
	}
}

export class PetNft {
	constructor(
		readonly id: number,
		readonly genes: DNA,
		readonly generation: number,
		readonly mumId: number,
		readonly dadId: number,
		readonly birthday: number
	) {}

	static createFrom(nft: NFTCore.PetStructOutput) {
		const dna = this.fromNumberToDna(nft.genes.toNumber());
		return new PetNft(nft.id.toNumber(), dna, nft.generation, nft.mumId, nft.dadId, nft.birthTime.toNumber());
	}

	static fromNumberToDna(value: number) {
		const valueAsString = value.toString();
		const dna = [
			valueAsString.substring(0, 2),
			valueAsString.substring(2, 4),
			valueAsString.substring(4, 6),
			valueAsString.substring(6, 8),
			valueAsString.substring(8, 9),
			valueAsString.substring(9, 10),
			valueAsString.substring(10, 12),
			valueAsString.substring(12, 14),
			valueAsString.substring(14, 15),
		];
		return dna.map(s => Number.parseInt(s)) as DNA;
	}

	static isValidDNA(dna: DNA) {
		return dna.filter(v => v == null || isNaN(v)).length == 0;
	}
}

export class PetAttributes {
	private constructor(private dna: DNA, private colors: ColorsRecord) {}

	static create(genes: DNA, colors: ColorsRecord) {
		return new PetAttributes(genes, colors);
	}

	colorOfBodyParts() {
		return {
			headChestColor: `#${this.colors[this.dna[0] as 10]}`,
			mouthBodyTailColor: `#${this.colors[this.dna[1] as 10]}`,
			eyeColor: `#${this.colors[this.dna[2] as 10]}`,
			earPawColor: `#${this.colors[this.dna[3] as 10]}`,
			decorationMiddleColor: `#${this.colors[this.dna[6] as 10]}`,
			decorationSideColor: `#${this.colors[this.dna[7] as 10]}`,
		};
	}

	eyeShape() {
		const eyeColor = this.colorOfBodyParts().eyeColor;
		const eyeStyle = { background: eyeColor, height: '42px', borderTopWidth: '0px', borderBottomWidth: '0px' };
		const eyeShape = this.dna[4];
		if (eyeShape == 2) {
			return { ...eyeStyle, height: '25px', borderBottomWidth: '15px' };
		}
		if (eyeShape == 3) {
			return { ...eyeStyle, height: '25px', borderTopWidth: '15px' };
		}
		if (eyeShape == 4) {
			return { ...eyeStyle, height: '10px', borderTopWidth: '15px', borderBottomWidth: '15px' };
		}
		return eyeStyle;
	}

	decoration() {
		const decorationPattern = this.dna[5];
		let middleStyle = { background: this.colorOfBodyParts().decorationMiddleColor, transform: 'rotate(0deg)' };
		let sideStyle = { background: this.colorOfBodyParts().decorationSideColor, transform: 'rotate(0deg)' };
		if (decorationPattern == 2) {
			middleStyle = { background: this.colorOfBodyParts().decorationMiddleColor, transform: 'rotate(180deg)' };
			sideStyle = { background: this.colorOfBodyParts().decorationSideColor, transform: 'rotate(180deg)' };
			return { middleStyle, sideStyle };
		}
		if (decorationPattern == 3) {
			middleStyle = {
				background: this.colorOfBodyParts().decorationMiddleColor,
				transform: 'rotate(180deg) translate(0, 40px)',
			};
			sideStyle = {
				background: this.colorOfBodyParts().decorationSideColor,
				transform: 'rotate(180deg) translate(0, 40px)',
			};
			return { middleStyle, sideStyle };
		}
		if (decorationPattern == 4) {
			middleStyle = { background: this.colorOfBodyParts().decorationMiddleColor, transform: 'scale(1.5, 0.5)' };
			sideStyle = { background: this.colorOfBodyParts().decorationSideColor, transform: 'scale(1.5, 0.5)' };
			return { middleStyle, sideStyle };
		}
		if (decorationPattern == 5) {
			middleStyle = {
				background: this.colorOfBodyParts().decorationMiddleColor,
				transform: 'rotate(180deg) scale(1.5, 0.5)',
			};
			sideStyle = {
				background: this.colorOfBodyParts().decorationSideColor,
				transform: 'rotate(180deg) scale(1.5, 0.5)',
			};
			return { middleStyle, sideStyle };
		}
		return { middleStyle, sideStyle };
	}

	headStyle() {
		const style = { background: this.colorOfBodyParts().headChestColor };
		const animation = this.dna[8];
		return animation === 2 ? { ...style, animation: 'moveHead 2s infinite' } : style;
	}

	tailStyle() {
		const style = { background: this.colorOfBodyParts().mouthBodyTailColor };
		const animation = this.dna[8];
		return animation === 3 ? { ...style, animation: 'moveTail 2.5s infinite' } : style;
	}

	rightEarStyle() {
		const style = { background: this.colorOfBodyParts().headChestColor };
		const animation = this.dna[8];
		if (animation === 4) {
			return { ...style, animation: 'earRight 3s infinite' };
		}
		if (animation === 5) {
			return { ...style, animation: 'earUpRight 3s infinite' };
		}
		return style;
	}

	leftEarStyle() {
		const style = { background: this.colorOfBodyParts().headChestColor };
		const animation = this.dna[8];
		if (animation === 4) {
			return { ...style, animation: 'earLeft 3s infinite' };
		}
		if (animation === 5) {
			return { ...style, animation: 'earUpLeft 3s infinite' };
		}
		return style;
	}
}
