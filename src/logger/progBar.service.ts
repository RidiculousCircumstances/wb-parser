import bar, { SingleBar } from 'cli-progress';

export class ProgressBar {
	private bar: SingleBar;
	private counter: number;
	private maxCount: number;
	constructor() {
		this.bar = new SingleBar({}, bar.Presets.rect);
		this.counter = 0;
	}

	public startProgBar(count: number, startMessage?: string, finalMessage?: string): void {
		if (this.counter != 0) {
			this.counter += 1;
			this.bar.update(this.counter);
			if (this.counter == this.maxCount) {
				this.bar.stop();
				this.counter = 0;
				console.log(`[Progress Bar] ${finalMessage}`);
			}
		} else {
			console.log(`[Progress Bar] ${startMessage}`);
			this.bar.start(count, 1);
			this.maxCount = count;
			this.counter += 1;
		}
	}
}
