import { IProductItem } from './productItem.interface';

export interface IParser {
	getDataFromDetailPage: () => Promise<IProductItem[]>;
}
