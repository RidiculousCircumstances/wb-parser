import puppeteer from 'puppeteer';
import { IParser } from './interfaces/parser.Interface';

async function init(): Promise<{
	browser: puppeteer.Browser;
	page: puppeteer.Page;
}> {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	return { browser, page };
}

async function getDetailPageLinksFromBasePages(): Promise<void> {
	const { page } = await init();
	const basePages = [
		'https://www.wildberries.ru/catalog/35591005/detail.aspx?targetUrl=GP',
		'https://www.wildberries.ru/catalog/18330441/detail.aspx?targetUrl=GP',
	];

	for (const url of basePages) {
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: 300000,
		});
		page.waitForTimeout(10000);
	}
}

async function main(): Promise<void> {
	const data = await getDetailPageLinksFromBasePages();
	console.log(data);
}

main();
