import { ILinksParserService } from './interfaces/linksParser.service.interface';
import { ILinksParseConfig } from '../config/parseConfig.interface';

export class LinksParserService implements ILinksParserService {
	constructor(private iterCount: number, private baseUrl: string) {}

	public parseLinksFromBasePages(parseConfig: ILinksParseConfig): string[] {
		const listOfLinks = [];
		const wholeNodeList = document.querySelectorAll(parseConfig.pagesSelector);
		if (wholeNodeList.length != 0) {
			for (const i of wholeNodeList) {
				const link = i
					.querySelector(parseConfig.linksSelector)
					?.getAttribute(parseConfig.linksAttribute) as string;
				if (link) {
					listOfLinks.push(link);
				}
			}
		} else {
			throw new Error('[LinksParserService] Прод. карточки не найдены. Некорректный селектор');
		}
		if (listOfLinks.length != 0) {
			return listOfLinks;
		} else {
			throw new Error('[LinksParserService] Ссылки не найдены. Некорректный селектор');
		}
	}

	public setLinksOfBasePages(): string[] {
		const countArray = Array.from(new Array(this.iterCount).keys()).map((k) => k + 1);
		const linksArray: string[] = [];
		countArray.forEach((num) => {
			const url = `${this.baseUrl.replace(/page=/, `page=${num}`)}`;
			linksArray.push(url);
		});
		return linksArray;
	}
}
