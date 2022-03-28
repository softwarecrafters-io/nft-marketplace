import { BigNumber, utils } from 'ethers';
import { DNA } from '../views/components/KittiesFactoryComponent';
import { KittyFactory } from '../../typechain-types';

export class Offer {
	constructor(readonly id: number, readonly price: BigNumber, readonly cat: Cat) {}

	static create(id: number, price: BigNumber, cat: Cat) {
		return new Offer(id, price, cat);
	}

	priceInEther() {
		return utils.formatEther(this.price);
	}
}

export class OfferEntity {
	constructor(readonly id: number, readonly price: BigNumber, readonly tokenId: number) {}

	static create(id: number, price: BigNumber, tokenId: number) {
		return new OfferEntity(id, price, tokenId);
	}
}

export class Cat {
	constructor(
		readonly id: number,
		readonly genes: DNA,
		readonly generation: number,
		readonly mumId: number,
		readonly dadId: number,
		readonly birthday: number
	) {}

	static createFrom(kittyStruct: KittyFactory.KittyStructOutput) {
		const dna = this.fromNumberToDna(kittyStruct.genes.toNumber());
		return new Cat(
			kittyStruct.id.toNumber(),
			dna,
			kittyStruct.generation,
			kittyStruct.mumId,
			kittyStruct.dadId,
			kittyStruct.birthTime.toNumber()
		);
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
