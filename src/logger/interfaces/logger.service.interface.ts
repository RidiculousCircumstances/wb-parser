export interface IloggerService {
	logger: unknown;

	log: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
}
