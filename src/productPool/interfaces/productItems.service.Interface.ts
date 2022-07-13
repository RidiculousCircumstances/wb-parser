import { IProductItem } from './productItem.interface';

export interface IProductItemsService {
	getDataFromDetailPage: () => Promise<IProductItem[]>;
}
