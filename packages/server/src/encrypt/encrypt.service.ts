import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptService {
	public async hash(value: string, rounds: number): Promise<string> {
		return value;
	}

	public async compare(a: string, b: string): Promise<boolean> {
		return a === b;
	}
}
