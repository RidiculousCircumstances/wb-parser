import puppeteer from 'puppeteer';
import { IParser } from './interfaces/parser.Interface';
import { IProductItem } from './interfaces/productItem.interface';

export class ProductParser implements IParser {
	private browser: puppeteer.Browser;
	private page: puppeteer.Page;
	constructor(private baseUrl: string, private iterCount: number) {}

	public async init(): Promise<void> {
		this.browser = await puppeteer.launch({ headless: true });
		this.page = await this.browser.newPage();
	}
	public async getDataFromDetailPage(): Promise<IProductItem[]> {
		const linksArray = await this.getDetailPageLinksFromBasePages();
		const productItems: IProductItem[] = [];
		let counter = 0;

		for (const url of linksArray) {
			await this.page.goto(url, {
				waitUntil: 'networkidle2',
				timeout: 300000,
			});
			counter += 1;
			await this.page.waitForTimeout(100);
			await this.page.content();
			const content = await this.page.evaluate(() => {
				const productItem: IProductItem = {};

				//вопрос
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
						.querySelector('.product-page .product-page__common-info .product-order-quantity')
						?.textContent?.replace(/\D/g, ''),
				);

				productItem.reviewCount = Number(
					document
						.querySelector('.product-page .product-page__common-info .product-review__count-review')
						?.textContent?.replace(/\D/g, ''),
				);

				productItem.price = Number(
					document
						.querySelector('.product-page .price-block__final-price')
						?.textContent?.replace(/\D/g, ''),
				);

				return productItem;
			});
			console.log(`iter № ${counter}/${linksArray.length}`);
			productItems.push(content);
		}

		this.browser.close();
		return productItems;
	}

	private getLinksOfBasePages(baseUrl: string): string[] {
		const countArray = Array.from(new Array(this.iterCount).keys()).map((k) => k + 1);
		const linksArray: string[] = [];
		countArray.forEach((num) => {
			const url = `${baseUrl.replace(/page=/, `page=${num}`)}`;
			linksArray.push(url);
		});
		return linksArray;
	}

	private async getDetailPageLinksFromBasePages(): Promise<string[]> {
		const basePages = this.getLinksOfBasePages(this.baseUrl);
		const detailPageLinks: string[] = [];

		for (const url of basePages) {
			await this.page.goto(url, {
				waitUntil: 'networkidle2',
				timeout: 300000,
			});
			await this.page.waitForTimeout(1000);

			await this.page.content();
			const content = await this.page.evaluate(() => {
				const listOfLinks = [];
				const wholeNodeList = document.querySelectorAll('.product-card');
				if (wholeNodeList.length != 0) {
					for (const i of wholeNodeList) {
						const link = i
							.querySelector('.catalog-page .product-card .product-card__main')
							?.getAttribute('href');
						if (link) {
							listOfLinks.push(link);
						} else {
							listOfLinks.push(
								'https://www.wildberries.ru/catalog/63810047/detail.aspx?targetUrl=BP',
							);
						}
					}
				} else {
					throw new Error('Не удалось найти элементы по указанному селектору');
				}

				return listOfLinks;
			});
			detailPageLinks.push(...content);
		}

		return detailPageLinks;
	}
}
