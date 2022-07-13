import { IProductItem } from './productItem.interface';

export interface IProductPool {
	brandName: string[];
	productName: string[];
	article: number[];
	ordersCount: number[];
	reviewCount: number[];
	price: number[];
	addItem: (items: IProductItem[]) => void;
	getData: () => string;
}
