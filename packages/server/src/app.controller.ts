import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { MailsService } from './mails.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly mailsService: MailsService,
	) {}

	@Get('profile')
	getProfile(@Req() req: Request) {
		return this.appService.getProfile(req.user);
	}

	@Get('test_mail')
	async sendTestMail() {
		await this.mailsService.sendPlainMessage(
			'test@labeeb.org',
			'Hello There 👋',
			`This is a test mail sent at ${new Date()}`,
		);
	}
}
