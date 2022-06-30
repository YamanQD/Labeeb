import { ITasksRepository } from "../domain/taskRepository";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) { }

    public async getTaskGroupsByProjectId(projectId: number) {
        return this.tasksRepository.getTaskGroupByProjectID(projectId);
    }

    public async getAllTaskGroups() {
        return this.tasksRepository.getAllTaskGroups();
    }
}