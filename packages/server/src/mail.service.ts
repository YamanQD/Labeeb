import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name);

	// TODO: configure the transport with the config service.
	private transporter = nodemailer.createTransport({
		host: 'localhost',
		port: 1025,
		auth: {
			user: 'project.1',
			pass: 'secret.1',
		},
	});

	async sendPlainMessage(
		to: string,
		title: string,
		content: string,
	): Promise<SMTPTransport.SentMessageInfo | null> {
		this.logger.verbose(`Sending <${to}> "${title}":\n${content}`);

		try {
			const info = await this.transporter.sendMail({
				from: `"Labeeb" <noreply@labeeb.org>`,
				to,
				subject: title,
				text: content,
			});

			this.logger.verbose(`Sent (${info.messageId}) successfully ✔️`);
		} catch (error: unknown) {
			this.logger.error(error instanceof Error ? `Failure: ${error.message}` : `Failed`);

			return null;
		}
	}
}
