import { IDataParserService } from './interfaces/dataParser.service.interface';
import { ILinksParseConfig } from '../config/parseConfig.interface';
import { IProductItem } from './interfaces/productItem.interface';

export class DataParserService implements IDataParserService {
	public parseDataFromDetailPage(parseConfig: ILinksParseConfig): IProductItem {
		const productItem: IProductItem = {};

		productItem.brandName = document
			.querySelector(parseConfig.brandName.l1)
			?.querySelector(parseConfig.brandName.l2)
			?.textContent?.replace(/,/g, ' ') as string;
		if (!productItem.brandName) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор brandName`,
			);
		}

		productItem.productName = document
			.querySelector(parseConfig.productName.l1)
			?.querySelector(parseConfig.productName.l2)
			?.textContent?.replace(/,/g, ' ') as string;
		if (!productItem.productName) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор productName`,
			);
		}

		productItem.article = Number(
			document.querySelector(parseConfig.article)?.textContent?.replace(/,/g, ' '),
		);
		if (!productItem.article) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор article`,
			);
		}

		productItem.ordersCount = Number(
			document.querySelector(parseConfig.ordersCount)?.textContent?.replace(/\D/g, ''),
		);
		if (!productItem.ordersCount) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор ordersCount`,
			);
		}

		productItem.reviewCount = Number(
			document.querySelector(parseConfig.reviewCount)?.textContent?.replace(/\D/g, ''),
		);
		if (!productItem.reviewCount) {
			productItem.reviewCount = 0;
		}

		productItem.price = Number(
			document.querySelector(parseConfig.price)?.textContent?.replace(/\D/g, ''),
		);
		if (!productItem.price) {
			throw new Error(
				`[DataParserService] Данные на странице не найдены. Некорректный селектор price`,
			);
		}

		return productItem;
	}
}
