import { faker } from '@faker-js/faker';
import { Priority } from 'src/enums/priority.enum';
import { Task } from 'src/tasks/task.entity';
import { define } from "typeorm-seeding";

const priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW, Priority.NONE];

define(Task, () => {
	const task = new Task();
	task.title = faker.lorem.sentence();
	task.description = faker.lorem.paragraph();
	task.priority = priorities[Math.floor(Math.random() * 100) % priorities.length];
	task.deadline = faker.date.future();
	return task;
});