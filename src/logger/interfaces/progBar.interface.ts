export interface IProgBar {
	bar: unknown;

	progBar: (count: number, startMessage?: string, finalMessage?: string) => void;
}
