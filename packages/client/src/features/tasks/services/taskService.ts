import { ITasksRepository } from "../domain/ItaskRepository";
import { CreateTaskDTO, TaskDTO, TaskListDTO } from "./dto";
import { TaskMapper } from "./mappers";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getTaskListsForProject(projectId: number): Promise<TaskListDTO[]> {
        const taskLists = await this.tasksRepository.getTaskListsForProject(projectId);
        return taskLists.map(TaskMapper.taskListToDTO);
    }

    public async getTaskList(listId: number): Promise<TaskListDTO> {
        const taskList = await this.tasksRepository.getTaskList(listId);
        return TaskMapper.taskListToDTO(taskList);
    }

    public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
        const newTask = await this.tasksRepository.createTask(task);
        return TaskMapper.taskToDTO(newTask);
    }
}
