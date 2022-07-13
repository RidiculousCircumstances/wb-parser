import { promises } from 'fs';
import { join } from 'path';
import puppeteer, { Puppeteer, PuppeteerNode } from 'puppeteer';
import config from 'config';
import { ProductParser } from './productParser';
import { ProductPoolEntity } from './productPool.entity';

const partPath = join(__dirname, '..', './output', 'part.csv');
//Проблемы - необходима инъекция аргументов централизованно, сверху вниз: параметры для puppeteer, селекторы для
//квери селектора.
//document.querySelector('.basket-page .accordion__list .list-item__count .count__left').textContent

async function bootstrap(): Promise<void> {
	const parser = new ProductParser(config.get('baseUrl'), 100);

	const entity = new ProductPoolEntity();

	await parser.init();

	const data = await parser.getDataFromDetailPage();

	entity.addItem(data);

	const csv = entity.getData();

	//console.log(data);
	await promises.writeFile(partPath, csv);
}

const a = new PuppeteerNode();

bootstrap();
