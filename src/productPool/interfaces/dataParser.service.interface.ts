import { IProductItem } from './productItem.interface';

export interface IDataParserService {
	parseDataFromDetailPage: () => IProductItem;
}
