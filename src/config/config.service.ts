import { ILinksParseConfig } from './parseConfig.interface';
import conf from './config.json';

export class ConsfigService {
	public getConfig(): ILinksParseConfig {
		const linksParseConfig: ILinksParseConfig = {
			brandName: { l1: conf.brandName.l1, l2: conf.brandName.l2 },
			productName: { l1: conf.productName.l1, l2: conf.productName.l2 },
			article: conf.article,
			ordersCount: conf.ordersCount,
			reviewCount: conf.reviewCount,
			price: conf.price,
			iterCount: Number(conf.iterCount),
			pagesSelector: conf.pagesSelector,
			linksSelector: conf.linksSelector,
			linksAttribute: conf.linksAttribute,
			baseUrl: conf.baseUrl,
		};
		return linksParseConfig;
	}
}
