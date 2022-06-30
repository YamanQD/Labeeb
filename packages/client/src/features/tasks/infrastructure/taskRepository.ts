import { IHTTPClient } from "src/core/infrastructure/interfaces/httpClient";
import { ITask, ITaskGroup, ITaskList } from "../domain/task";
import { ITasksRepository } from "../domain/taskRepository";

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public getTask(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    public async getAllTaskGroups(): Promise<ITaskGroup[]> {
        const mockTasksLists: ITaskList[] = [
            {
                id: 1,
                status: "Frontend",
                tasks: [
                    {
                        id: 1,
                        title: "Create application",
                    },

                    {
                        id: 2,

                        title: "Work",
                    },

                    {
                        id: 13,
                        title: "Go to lobby",
                    },
                ],
            },

            {
                id: 2,
                status: "Backend",
                tasks: [
                    {
                        id: 1,
                        title: "Snow",
                    },

                    {
                        id: 2,
                        title: "Yaman",
                    },

                    {
                        id: 13,
                        title: "Malki",
                    },
                ],
            },
        ];

        const mockTaskGroups = [
            {
                id: 1,
                title: "Hasan",
                lists: mockTasksLists,
            },
        ];

        return mockTaskGroups;
    }

    public getTaskGroupByProjectID(projectID: number): Promise<ITaskGroup> {
        throw new Error("Method not implemented.");
    }
}
