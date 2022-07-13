import { IDataParserService } from './interfaces/dataParser.service.interface';
import { IProductItem } from './interfaces/productItem.interface';

export class DataParserService implements IDataParserService {
	public parseDataFromDetailPage(): IProductItem {
		const productItem: IProductItem = {};

		productItem.brandName = document
			.querySelector('.product-page .product-page__header')
			?.querySelector('span')
			?.textContent?.replace(/,/g, ' ') as string;

		productItem.productName = document
			.querySelector('.product-page .product-page__header')
			?.querySelector('h1')
			?.textContent?.replace(/,/g, ' ') as string;

		productItem.article = Number(
			document
				.querySelector(
					'.product-page .product-page__common-info .product-article span:last-of-type',
				)
				?.textContent?.replace(/,/g, ' '),
		);

		productItem.ordersCount = Number(
			document
				.querySelector('.product-pagess .product-page__common-info .product-order-quantity')
				?.textContent?.replace(/\D/g, ''),
		);

		productItem.reviewCount = Number(
			document
				.querySelector('.product-page .product-page__common-info .product-review__count-review')
				?.textContent?.replace(/\D/g, ''),
		);

		productItem.price = Number(
			document
				.querySelector('.product-pageыы .price-block__final-pricedd')
				?.textContent?.replace(/\D/g, ''),
		);

		let checker = 0;
		for (const i of Object.values(productItem)) {
			if (i) {
				checker += 1;
			}
		}
		if (checker < Object.values(productItem).length - 1) {
			throw new Error(`[DataParserService] Данные на странице не найдены. Некорректный селектор`);
		} else {
			return productItem;
		}
	}
}
