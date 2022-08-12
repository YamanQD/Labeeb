import { HTTPClient } from "src/lib/http/httpClient";
import { TasksRepository } from "./taskRepository";
import { TasksService } from "./taskService";

const httpClient = HTTPClient.getInstance();
const tasksRepository = new TasksRepository(httpClient);
export const tasksService = new TasksService(tasksRepository);

const getTimeDifferenceInHours = (a: Date, b: Date) => {
    const differenceInMs = b.getTime() - a.getTime();
    const differenceInHours = differenceInMs / 1000 / 60 / 60;

    return differenceInHours;
};

/**
 * Converts a JavaScript date object to a string with the format "YYYY-MM-DD"
 */
export const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

type DeadlineStatus = "passed" | "close" | "far";
export const getDeadlineStatus = (deadline: Date): DeadlineStatus => {
    const currentDate = new Date();
    const differenceInHours = getTimeDifferenceInHours(currentDate, deadline);

    let status: DeadlineStatus;
    if (differenceInHours <= 0) status = "passed";
    else if (differenceInHours < 24 * 3) status = "close";
    else status = "far";

    return status;
};

export * from "../types/task.dto";
export * from "./styles";
