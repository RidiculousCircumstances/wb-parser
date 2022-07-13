import { promises } from 'fs';
import { join } from 'path';
import config from 'config';
import { ProductItemsService } from './productPool/productItems.service';
import { ProductItemsEntity } from './productPool/productItems.entity';
import { LoggerService } from './logger/logger.service';
import { LinksParserService } from './productPool/linksParser.service';
import { DataParserService } from './productPool/dataParser.service';

const partPath = join(__dirname, '..', './output', 'part.csv');

async function bootstrap(): Promise<void> {
	const parser = new ProductItemsService(
		new LoggerService(),
		new LinksParserService(2, config.get('baseUrl')),
		new DataParserService(),
	);
	const productItemsEntity = new ProductItemsEntity();
	await parser.init();
	const data = await parser.getDataFromDetailPage();
	productItemsEntity.addItem(data);
	const output = productItemsEntity.getData();
	await promises.writeFile(partPath, output);
}

bootstrap();
