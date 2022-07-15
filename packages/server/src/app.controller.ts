import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { MailService } from './mail.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly mailsService: MailService,
	) {}

	@Get('profile')
	getProfile(@Req() req: Request) {
		return this.appService.getProfile(req.user);
	}

	@Public()
	@Get('test_mail')
	async sendTestMail() {
		return await this.mailsService.sendPlainMessage(
			'test@labeeb.org',
			'Hello There 👋',
			`This is a test mail sent at ${new Date()}`,
		);
	}
}
