import { BigNumber } from 'ethers';
import { from, map, mergeMap, Subject, zip } from 'rxjs';
import { KittyFactory } from '../../typechain-types';
import { ContractConfig, ContractConnector } from '../application-services/contractConnector';
import { Cat } from '../models/models';

type CatDto = {
	id: number;
	mumId: number;
	dadId: number;
	dna: number;
	owner: string;
};

export class NFTInteractor {
	contractAPI: KittyFactory;
	birthBus: Subject<CatDto> = new Subject();

	constructor(private contractConnector: ContractConnector, private contractConfig: ContractConfig) {
		this.contractAPI = contractConnector.connect(contractConfig);
		this.contractAPI.on(this.contractAPI.filters.Birth(), (...values) => {
			this.birthBus.next({
				id: values[1].toNumber(),
				mumId: values[2].toNumber(),
				dadId: values[3].toNumber(),
				dna: values[4].toNumber(),
				owner: values[0],
			});
		});
	}

	breed(dadId: number, mumId: number) {
		return from(this.contractAPI.breed(dadId, mumId));
	}

	requestNFTBy(id: number) {
		return from(this.contractAPI.getKitty(id));
	}

	mintKitty(genes: number) {
		return from(this.contractAPI.mintGenerationZeroKitty(genes));
	}

	totalSupply() {
		return from(this.contractAPI.totalSupply());
	}

	balanceOf(accountAddress: string) {
		return from(this.contractAPI.balanceOf(accountAddress));
	}

	tokenOfOwnerByIndex(accountAddress: string, index: number) {
		return from(this.contractAPI.tokenOfOwnerByIndex(accountAddress, index));
	}

	transfer(addressFrom: string, addressTo: string, tokenId: BigNumber) {
		return from(this.contractAPI.transferFrom(addressFrom, addressTo, tokenId));
	}

	setApprovalForAll(address: string) {
		return from(this.contractAPI.setApprovalForAll(address, true));
	}
}
