import { ITasksRepository, TaskGroupFilters } from "../domain/ItaskRepository";
import { ITaskGroup } from "../domain/task";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getTaskGroupsForProject({ projectId, groupId }: TaskGroupFilters): Promise<ITaskGroup[]> {
        return this.tasksRepository.getTaskGroups({
            projectId,
            groupId
        });
    }
}
