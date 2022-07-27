export interface ILinksParseConfig {
	baseUrl: string;
	iterCount: number;
	pagesSelector: string;
	linksSelector: string;
	linksAttribute: string;
	brandName: {
		l1: string;
		l2: string;
	};
	productName: {
		l1: string;
		l2: string;
	};
	article: string;
	ordersCount: string;
	reviewCount: string;
	price: string;
}
