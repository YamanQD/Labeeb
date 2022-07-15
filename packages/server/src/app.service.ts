import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ListsService } from './lists/lists.service';
import { ProjectsService } from './projects/projects.service';
import { TasksService } from './tasks/tasks.service';
import { UserWithoutPassword } from './users/user.types';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(
		private usersService: UsersService,
		private tasksService: TasksService,
		private listsService: ListsService,
		private projectsService: ProjectsService,
	) { }

	async getProfile(user: User): Promise<UserWithoutPassword> {
		const profile = await this.usersService.findOne(user.username);
		delete profile.password;

		return profile;
	}

	async onApplicationBootstrap() {
		await this.usersService.seed();
		await this.projectsService.seed();
		setTimeout(async () => await this.listsService.seed(), 1000);
		setTimeout(async () => await this.tasksService.seed(), 2000);
	}
}
