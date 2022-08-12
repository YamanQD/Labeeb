import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class EncryptService implements OnModuleInit {
	private readonly logger = new Logger(EncryptService.name);

	async onModuleInit() {
		try {
			const bcrypt = await import(`bcrypt`);

			this.hash = (value) => bcrypt.hash(value, 10);
			this.compare = (a, b) => bcrypt.compare(a, b);
		} catch (_) {
			this.logger.warn(
				'Falling back to plain text passwords, reason: failed to load bcrypt.',
			);
		}
	}

	public async hash(value: string): Promise<string> {
		return value;
	}

	public async compare(a: string, b: string): Promise<boolean> {
		return a === b;
	}
}
