import { ITasksRepository, TaskListFilters } from "../domain/ItaskRepository";
import { CreateTaskDTO, TaskDTO, TaskListDTO } from "./dto";
import { TaskMapper } from "./mappers";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getTaskListsForProject({
        projectId,
        listId,
    }: TaskListFilters): Promise<TaskListDTO[]> {
        const taskLists = await this.tasksRepository.getTaskLists({
            projectId,
            listId,
        });

        return taskLists.map(TaskMapper.taskListToDTO);
    }

    public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
        const newTask = await this.tasksRepository.createTask(task);
        return TaskMapper.taskToDTO(newTask);
    }
}
