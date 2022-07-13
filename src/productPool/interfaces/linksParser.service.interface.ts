export interface ILinksParserService {
	parseLinksFromBasePages: () => string[];
	setLinksOfBasePages: (baseUrl?: string, iterCount?: number) => string[];
}
