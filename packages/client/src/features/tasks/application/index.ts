import { HTTPClient } from "src/lib/http/httpClient";

import { TasksRepository } from "./taskRepository";
import { TasksService } from "./taskService";

const httpClient = HTTPClient.getInstance();
const tasksRepository = new TasksRepository(httpClient);
export const tasksService = new TasksService(tasksRepository);

export * from "../types/task.dto";
