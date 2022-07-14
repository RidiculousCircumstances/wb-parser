import { IDataParserService } from './interfaces/dataParser.service.interface';
import { IProductItem } from './interfaces/productItem.interface';

export class DataParserService implements IDataParserService {
	public parseDataFromDetailPage(): IProductItem {
		const productItem: IProductItem = {};

		productItem.brandName = document
			.querySelector('.product-page .product-page__header')
			?.querySelector('span')
			?.textContent?.replace(/,/g, ' ') as string;
		if (!productItem.brandName) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор brandName`,
			);
		}

		productItem.productName = document
			.querySelector('.product-page .product-page__header')
			?.querySelector('h1')
			?.textContent?.replace(/,/g, ' ') as string;
		if (!productItem.productName) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор productName`,
			);
		}

		productItem.article = Number(
			document
				.querySelector(
					'.product-page .product-page__common-info .product-article span:last-of-type',
				)
				?.textContent?.replace(/,/g, ' '),
		);
		if (!productItem.article) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор article`,
			);
		}

		productItem.ordersCount = Number(
			document
				.querySelector('.product-page .product-page__common-info .product-order-quantity')
				?.textContent?.replace(/\D/g, ''),
		);
		if (!productItem.ordersCount) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор ordersCount`,
			);
		}

		productItem.reviewCount = Number(
			document
				.querySelector('.product-page .product-page__common-info .product-review__count-review')
				?.textContent?.replace(/\D/g, ''),
		);
		if (!productItem.reviewCount) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор reviewCount`,
			);
		}

		productItem.price = Number(
			document
				.querySelector('.product-page .price-block__final-price')
				?.textContent?.replace(/\D/g, ''),
		);
		if (!productItem.price) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор price`,
			);
		}

		return productItem;
	}
}
