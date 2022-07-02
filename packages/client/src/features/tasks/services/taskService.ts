import { ITasksRepository } from "../domain/ItaskRepository";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getAllTaskGroupsForProject(projectId: number) {
        return this.tasksRepository.getAllTaskGroupsForProject(projectId);
    }

    public async getTaskGroup(groupId: number) {
        return this.tasksRepository.getTaskGroup(groupId);
    }
}
