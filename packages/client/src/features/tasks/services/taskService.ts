import { ITasksRepository } from "../domain/ItaskRepository";
import { CreateTaskDTO, TaskDetailsDTO, TaskDTO, TaskListDTO } from "./dto";
import { TaskMapper } from "./mappers";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async getTask(taskId: number): Promise<TaskDetailsDTO> {
        const task = await this.tasksRepository.getTask(taskId);
        return TaskMapper.taskDetailsToDTO(task);
    }

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
