import puppeteer from 'puppeteer';
import { IProductItemsService } from './interfaces/productItems.service.Interface';
import { IProductItem } from './interfaces/productItem.interface';
import { IloggerService } from '../logger/interfaces/logger.service.interface';
import { IProgBar } from '../logger/interfaces/progBar.interface';
import { ILinksParserService } from './interfaces/linksParser.service.interface';
import { IDataParserService } from './interfaces/dataParser.service.interface';
import { ILinksParseConfig } from '../config/parseConfig.interface';

export class ProductItemsService implements IProductItemsService {
	private browser: puppeteer.Browser;
	private page: puppeteer.Page;
	constructor(
		private logger: IloggerService & IProgBar,
		private linksParser: ILinksParserService,
		private dataParser: IDataParserService,
		private parseConfig: ILinksParseConfig,
	) {}

	public async init(): Promise<void> {
		this.browser = await puppeteer.launch({ headless: false });
		this.page = await this.browser.newPage();
		this.logger.log('Puppeteer успешно запущен');
	}

	public async getDataFromDetailPage(): Promise<IProductItem[]> {
		const linksArray = await this.getLinksFromBasePages();
		const productItems: IProductItem[] = [];

		try {
			for (const url of linksArray) {
				await this.page.goto(url, {
					waitUntil: 'networkidle2',
					timeout: 300000,
				});
				await this.page.waitForSelector(this.parseConfig.brandName.l1);
				const content = await this.page.evaluate(
					this.dataParser.parseDataFromDetailPage,
					this.parseConfig,
				);
				this.logger.progBar(
					linksArray.length,
					'Прогресс получения данных со страниц:',
					'Парсинг страниц завершен',
				);
				productItems.push(content);
			}
		} catch (error) {
			this.logger.error(error);
		}

		this.browser.close();
		return productItems;
	}

	private async getLinksFromBasePages(): Promise<string[]> {
		const basePages = this.linksParser.setLinksOfBasePages();
		const detailPageLinks: string[] = [];

		try {
			for (const url of basePages) {
				await this.page.goto(url, {
					waitUntil: 'networkidle2',
					timeout: 300000,
				});
				await this.page.waitForSelector(this.parseConfig.pagesSelector);
				const content = await this.page.evaluate(
					this.linksParser.parseLinksFromBasePages,
					this.parseConfig,
				);
				this.logger.progBar(
					basePages.length,
					'Прогресс получения ссылок:',
					'Парсинг ссылок завершен',
				);
				detailPageLinks.push(...content);
			}
		} catch (error) {
			this.logger.error(error);
		}

		return detailPageLinks;
	}
}
