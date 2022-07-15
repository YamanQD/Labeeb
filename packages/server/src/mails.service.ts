import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Injectable, Logger } from '@nestjs/common';

type Transporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

@Injectable()
export class MailsService {
	private readonly logger = new Logger(MailsService.name);

	private constructor(private readonly transporter: Transporter) {}

	async sendPlainMessage(to: string, title: string, content: string) {
		const info = await this.transporter.sendMail({
			from: `"Labeeb" <noreply@labeeb.org>`,
			to,
			subject: title,
			text: content,
		});

		this.logger.verbose(`Message sent: ${info.messageId}`);
		this.logger.verbose(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
	}

	static async createTestMailer() {
		const testAccount = await nodemailer.createTestAccount();

		console.log('creating transport');
		const transporter: Transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		});

		return new MailsService(transporter);
	}
}

export const mailProvider = {
	provide: MailsService,
	useFactory: async () => {
		const mailer = await MailsService.createTestMailer();
		return mailer;
	},
};
