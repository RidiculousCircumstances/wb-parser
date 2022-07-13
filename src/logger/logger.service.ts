import { Logger } from 'tslog';
import { IloggerService } from './interfaces/logger.service.interface';
import { IProgBar } from './interfaces/progBar.interface';
import { ProgressBar } from './progBar.service';

export class LoggerService implements IloggerService, IProgBar {
	public logger: Logger;
	public bar: ProgressBar;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
		this.bar = new ProgressBar();
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	progBar(count: number, startMessage?: string, finalMessage?: string): void {
		this.bar.startProgBar(count, startMessage, finalMessage);
	}
}
