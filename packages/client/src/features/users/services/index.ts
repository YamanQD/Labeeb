import { HTTPClient } from "src/lib/http/httpClient";
import { UserRepository } from "../infrastructure/userRepository";
import { UserService } from "./userService";

const httpClient = HTTPClient.getInstance();
const userRepository = new UserRepository(httpClient);
export const userService = new UserService(userRepository);