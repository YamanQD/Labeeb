import { ITasksRepository, TaskGroupFilters } from "../domain/ItaskRepository";
import { TaskGroupDTO } from "./dto";
import { TaskMapper } from "./mappers";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getTaskGroupsForProject({ projectId, groupId }: TaskGroupFilters): Promise<TaskGroupDTO[]> {
        const taskGroups = await this.tasksRepository.getTaskGroups({
            projectId,
            groupId
        });

        return taskGroups.map(TaskMapper.taskGroupToDTO);
    }
}
