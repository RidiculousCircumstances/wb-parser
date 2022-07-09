import { promises } from 'fs';
import { join } from 'path';
import puppeteer from 'puppeteer';

const SITE = 'https://www.wildberries.ru/catalog/muzhchinam/odezhda/bryuki-i-shorty';

const partPath = join(__dirname, '..', './output', 'part.txt');
const wholePath = join(__dirname, '..', './output', 'whole.html');

const LAUNCH_PUPPETEER_OPTS = {
	args: [
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-dev-shm-usage',
		'--disable-accelerated-2d-canvas',
		'--disable-gpu',
		'--window-size=1920x1080',
	],
};

interface obj2Return {
	partOfContent: string[];
	wholeContent: string;
}

async function getPageContent(url: string): Promise<obj2Return> {
	const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
	const page = await browser.newPage();
	await page.goto(url, {
		waitUntil: 'networkidle2',
		timeout: 300000,
	});

	const wholeContent = await page.content();
	const content = await page.evaluate(() => {
		const listOfLinks = [];
		const wholeNodeList = document.querySelectorAll('.product-card');
		if (wholeNodeList.length != 0) {
			for (const i of wholeNodeList) {
				const link = i
					.querySelector('.catalog-page .product-card .product-card__main')
					?.getAttribute('href');
				if (link) {
					listOfLinks.push(link);
				} else {
					listOfLinks.push('none');
				}
			}
		} else {
			throw new Error('Не удалось найти элементы по указанному селектору');
		}

		return listOfLinks;
	});

	const objToReturn: obj2Return = {
		partOfContent: content,
		wholeContent: wholeContent,
	};
	browser.close();
	return objToReturn;
}

async function getData(): Promise<void> {
	const { partOfContent, wholeContent } = await getPageContent(SITE);
	console.log(partOfContent);
	await promises.writeFile(partPath, partOfContent);
	await promises.writeFile(wholePath, wholeContent);
}

getData();
