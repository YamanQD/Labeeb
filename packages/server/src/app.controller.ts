import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { MailService } from './mail.service';
import { UserWithoutPassword } from './users/user.types';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly mailsService: MailService,
	) { }

	/**
	 * Get the details of the authenticated user.
	 */
	@ApiTags('auth')
	@Get('profile')
	async getProfile(@Req() req: Request): Promise<UserWithoutPassword> {
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
