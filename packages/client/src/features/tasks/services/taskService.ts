import { ITasksRepository, TaskGroupFilters } from "../domain/ItaskRepository";
import { CreateTaskDTO, TaskDTO, TaskGroupDTO } from "./dto";
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

    public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
        const newTask = await this.tasksRepository.createTask(task);
        return TaskMapper.taskToDTO(newTask);
    }
}
