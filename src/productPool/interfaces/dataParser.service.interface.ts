import { ILinksParseConfig } from '../../config/parseConfig.interface';
import { IProductItem } from './productItem.interface';

export interface IDataParserService {
	parseDataFromDetailPage: (parseConfig: ILinksParseConfig) => IProductItem;
}
