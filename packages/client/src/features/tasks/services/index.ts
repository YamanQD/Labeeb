import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { TasksRepository } from "../infrastructure/taskRepository";
import { TasksService } from "./taskService";

const httpClient = HTTPClient.getInstance();
const tasksRepository = new TasksRepository(httpClient);
export const tasksService = new TasksService(tasksRepository);

export * from "./dto";
