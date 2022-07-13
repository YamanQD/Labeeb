import { faker } from '@faker-js/faker';
import { User } from "src/users/user.entity";
import { define } from "typeorm-seeding";

define(User, () => {
	const user = new User();
	user.username = faker.internet.userName();
	user.password = faker.internet.password();
	return user;
});