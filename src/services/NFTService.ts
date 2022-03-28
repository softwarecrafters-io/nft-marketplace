import { catchError, from, map, mergeMap, Observable, Subject, zip } from 'rxjs';
import { Cat } from '../models/models';
import { NFTInteractor } from '../contract-interactors/NFTInteractor';
import { Maybe, Nothing } from 'monet';

export class NFTService {
	constructor(private nftInteractor: NFTInteractor) {}

	setApprovalForAll(address: string) {
		console.log('setApprovalForAll');
		return this.nftInteractor.setApprovalForAll(address).pipe(mergeMap(tx => from(tx.wait())));
	}

	mint(genes: number) {
		return this.nftInteractor.mintKitty(genes).pipe(mergeMap(tx => from(tx.wait())));
	}

	breed(dadId: number, mumId: number) {
		return this.nftInteractor.breed(dadId, mumId).pipe(mergeMap(tx => from(tx.wait())));
	}

	getNFTById(tokenId: number): Observable<Cat> {
		return this.nftInteractor.requestNFTBy(tokenId).pipe(map(cat => Cat.createFrom(cat)));
	}

	getCatsWithValidDNAByOwner(account: string) {
		return from(
			this.nftInteractor.balanceOf(account).pipe(map(b => ({ balance: b.toNumber(), owner: account })))
		).pipe(
			map(b => ({ range: this.range(0, b.balance), owner: b.owner })),
			map(r => r.range.map(n => this.nftInteractor.tokenOfOwnerByIndex(r.owner, n))),
			mergeMap(requestsToGetIndexes => zip(...requestsToGetIndexes)),
			map(ids => ids.map(id => this.nftInteractor.requestNFTBy(id.toNumber()))),
			mergeMap(requestsToGetNFTData => zip(...requestsToGetNFTData)),
			map(cats => cats.filter(cat => Cat.isValidDNA(Cat.fromNumberToDna(cat.genes.toNumber())))),
			map(cats => cats.map(cat => Cat.createFrom(cat)))
		);
	}

	private range(from: number, length: number, steps = 1): number[] {
		return Array.from({ length: length }, (_, i) => (i + from) * steps);
	}
}
