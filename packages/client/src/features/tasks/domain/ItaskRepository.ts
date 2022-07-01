import { ITask, ITaskGroup } from "./task";

export interface ITasksRepository {
    getTask(id: number): Promise<ITask>;

    getAllTaskGroups(): Promise<ITaskGroup[]>;
    getTaskGroupByProjectID(projectID: number): Promise<ITaskGroup[]>;
}