import { User as UserEntity } from 'src/users/user.entity';

declare global {
	namespace Express {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface User extends UserEntity {}
	}
}
