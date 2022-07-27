import R from 'ramda';
import { IProductItem } from './interfaces/productItem.interface';

export class ProductItemsEntity {
	private items: any = {
		brandName: [],
		productName: [],
		article: [],
		ordersCount: [],
		reviewCount: [],
		price: [],
	};

	public addItem(items: any): void {
		for (const item in items) {
			for (const prop in items[item]) {
				for (const transfProp in this.items) {
					if (transfProp == prop) {
						this.items[transfProp].push(items[item][prop]);
					}
				}
			}
		}
	}

	public getData(): string {
		let csvRows = [];
		const tempArr = [];
		const headers = [];

		for (const item in this.items) {
			headers.push(item);
			tempArr.push(this.items[item]);
		}
		csvRows.push(R.transpose(tempArr));
		csvRows = csvRows.flat();
		csvRows.unshift(headers);
		return csvRows.join('\n');
	}
}
