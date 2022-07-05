import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { UserRepository } from "../infrastructure/userRepository";
import { UserService } from "./userService";

const httpClient = new HTTPClient();
const userRepository = new UserRepository(httpClient);
export const userService = new UserService(userRepository);