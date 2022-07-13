import { IProductItem } from './interfaces/productItem.interface';

export class ProductItemsEntity {
	private brandName: string[] = [];
	private productName: string[] = [];
	private article: number[] = [];
	private ordersCount: number[] = [];
	private reviewCount: number[] = [];
	private price: number[] = [];

	public addItem(items: IProductItem[]): void {
		for (const i of items) {
			this.brandName.push(i.brandName as string);
			this.productName.push(i.productName as string);
			this.article.push(i.article as number);
			this.ordersCount.push(i.ordersCount as number);
			this.reviewCount.push(i.reviewCount as number);
			this.price.push(i.price as number);
		}
	}

	public getData(): string {
		const csvRows = [];
		const headers = Object.keys(this);
		csvRows.push(headers);

		for (let i = 0; i < this.checkLength(); i++) {
			csvRows.push(
				Object.values([
					this.brandName[i],
					this.productName[i],
					this.article[i],
					this.ordersCount[i],
					this.reviewCount[i],
					this.price[i],
				]),
			);
		}
		console.log(this.checkLength());
		return csvRows.join('\n');
	}

	private checkLength(): number {
		const propsCount = Object.keys(this).length;
		let propsLengthSum = 0;
		for (let i = 0; i < propsCount; i++) {
			propsLengthSum += Object.values(this)[i].length;
		}
		const propsLenghtAvr = Math.ceil(propsLengthSum / propsCount);
		return propsLenghtAvr;
	}
}
