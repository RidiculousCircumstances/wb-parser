import { promises } from 'fs';
import { join } from 'path';
import { ProductItemsService } from './productPool/productItems.service';
import { ProductItemsEntity } from './productPool/productItems.entity';
import { LoggerService } from './logger/logger.service';
import { LinksParserService } from './productPool/linksParser.service';
import { DataParserService } from './productPool/dataParser.service';
import { ConsfigService } from './config/config.service';
import conf from './config/config.json';

const partPath = join(__dirname, '..', './output', 'part.csv');

async function bootstrap(): Promise<void> {
	const config = new ConsfigService();
	const parseConfig = config.getConfig();
	const parser = new ProductItemsService(
		new LoggerService(),
		new LinksParserService(parseConfig.iterCount, conf.baseUrl),
		new DataParserService(),
		parseConfig,
	);
	const productItemsEntity = new ProductItemsEntity();
	await parser.init();
	const data = await parser.getDataFromDetailPage();
	productItemsEntity.addItem(data);
	const output = productItemsEntity.getData();
	await promises.writeFile(partPath, output);
}

bootstrap();
