import { ILinksParseConfig } from '../../config/parseConfig.interface';

export interface ILinksParserService {
	parseLinksFromBasePages: (parsConfig: ILinksParseConfig) => string[];
	setLinksOfBasePages: (baseUrl?: string, iterCount?: number) => string[];
}
