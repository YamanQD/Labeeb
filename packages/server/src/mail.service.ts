import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name);

	private transporter = nodemailer.createTransport({
		host: 'localhost',
		port: 1025,
		auth: {
			user: 'project.1',
			pass: 'secret.1',
		},
	});

	async sendPlainMessage(to: string, title: string, content: string) {
		const info = await this.transporter.sendMail({
			from: `"Labeeb" <noreply@labeeb.org>`,
			to,
			subject: title,
			text: content,
		});

		this.logger.verbose(`Sent mail successfully to ${to}`);
		this.logger.verbose(`Email title: ${title}`);
		this.logger.verbose(`Email content: ${content}`);

		return info;
	}
}
