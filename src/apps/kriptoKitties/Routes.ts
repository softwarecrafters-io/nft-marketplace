export class Routes {
	static kittiesFactory = '/';
	static marketPlace = '/marketplace';
	static myNfts = '/my-nfts';
	static breading = '/breading';

	static nftDetailsBy = (id: number) => {
		return `${this.myNfts}/${id}`;
	};
}
