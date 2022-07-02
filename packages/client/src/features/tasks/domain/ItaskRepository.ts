import { ITask, ITaskGroup } from "./task";

export interface ITasksRepository {
    getTask(id: number): Promise<ITask>;

    getAllTaskGroupsForProject(projectId: number): Promise<ITaskGroup[]>;
    getTaskGroup(groupId: number): Promise<ITaskGroup>;
}
