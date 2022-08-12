import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Injectable, Logger } from '@nestjs/common';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Project } from './projects/project.entity';

const DAY_MS_LENGTH = 24 * 60 * 60 * 1000;

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
		important = false,
	): Promise<SMTPTransport.SentMessageInfo | null> {
		// this.logger.debug(`Sending <${to}> "${title}":\n${content}`);

		try {
			const info = await this.transporter.sendMail({
				from: `"Labeeb System" <noreply@labeeb.org>`,
				to,
				subject: title,
				text: content,
				priority: important ? 'high' : 'normal',
			});

			this.logger.verbose(`Sent (${info.messageId}) successfully ✔️`);

			return info;
		} catch (error: unknown) {
			this.logger.error(error instanceof Error ? `Failure: ${error.message}` : `Failed`);

			return null;
		}
	}

	async sendWelcomeEmail(user: User) {
		await this.sendPlainMessage(
			user.email,
			'Welcome to Labeeb',
			`Hello, ${user.username}!
A new Labeeb account has been created for you using this email.
You can login to the system using this email, and the password provided for you by your administrator.
Thank you for using Labeeb!

Note: If you did not request this account, you can safely ignore this email.`,
		);
	}

	async sendAssignedNotification(user: User, task: Task) {
		await this.sendPlainMessage(
			user.email,
			'You have been assigned a new task',
			`Hello, ${user.username}!
You have been assigned the task "${task.title}".
You can view the task details using the app.

Thank you for using Labeeb!`,
		);
	}

	async sendProjectNotification(user: User, project: Project) {
		await this.sendPlainMessage(
			user.email,
			'You have been added to a new project',
			`Hello, ${user.username}!
You have been added to the project "${project.title}".
You can view the project details using the app.

Thank you for using Labeeb!`,
		);
	}

	async sendTaskReminder(task: Task) {
		const now = new Date().valueOf();
		const remainingDays = Math.ceil((task.deadline.valueOf() - now) / DAY_MS_LENGTH);

		const targets = [task.owner, ...task.assignees];

		for (const target of targets) {
			const title = `Reminder: ${remainingDays} days remaining for the task "${task.title}"`;
			const content = `Hello ${target.username},

We would like to inform you that ${remainingDays} days are remaining until the deadline of the task "${task.title}"!

Best Wishes,
Labeeb System

P.S: u won't make it in time.`;

			return await this.sendPlainMessage(target.email, title, content);
		}
	}
}
