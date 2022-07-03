import { ITasksRepository, TaskGroupFilters } from "../domain/ItaskRepository";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getTaskGroupsForProject({ projectId, groupId }: TaskGroupFilters) {
        return this.tasksRepository.getTaskGroups({
            projectId,
            groupId
        });
    }
}
