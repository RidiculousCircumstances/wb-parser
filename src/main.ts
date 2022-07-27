import { promises } from 'fs';
import { join } from 'path';
import { ProductItemsService } from './productPool/productItems.service';
import { ProductItemsEntity } from './productPool/productItems.entity';
import { LoggerService } from './logger/logger.service';
import { LinksParserService } from './productPool/linksParser.service';
import { DataParserService } from './productPool/dataParser.service';
import config from './config/config.json';

const path = join(__dirname, '..', './output', 'data.csv');

async function bootstrap(): Promise<void> {
	const parser = new ProductItemsService(
		new LoggerService(),
		new LinksParserService(config.iterCount, config.baseUrl),
		new DataParserService(),
		config,
	);
	const productItemsEntity = new ProductItemsEntity();
	await parser.init();
	const data = await parser.getDataFromDetailPage();
	productItemsEntity.addItem(data);
	const output = productItemsEntity.getData();
	await promises.writeFile(path, output);
}

bootstrap();
