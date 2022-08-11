import { ITasksRepository } from "./ItaskRepository";
import { CreateTaskDTO, EditTaskDTO, TaskDetailsDTO, TaskDTO, TaskListDTO } from "../types/task.dto";
import { TaskMapper } from "./taskMapper";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) {}

    public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
        const newTask = await this.tasksRepository.createTask(task);
        return TaskMapper.taskToDTO(newTask);
    }

    public async getTask(taskId: number): Promise<TaskDetailsDTO> {
        const task = await this.tasksRepository.getTask(taskId);
        return TaskMapper.taskDetailsToDTO(task);
    }

    public async editTask(taskId: number, editedTask: EditTaskDTO): Promise<void> {
        await this.tasksRepository.editTask(taskId, editedTask);
    }

    public async deleteTask(taskId: number): Promise<void> {
        await this.tasksRepository.deleteTask(taskId);
    }

    public async getTaskListsForProject(projectId: number): Promise<TaskListDTO[]> {
        const taskLists = await this.tasksRepository.getTaskListsForProject(projectId);
        return taskLists.map(TaskMapper.taskListToDTO);
    }

    public async getTaskList(listId: number): Promise<TaskListDTO> {
        const taskList = await this.tasksRepository.getTaskList(listId);
        return TaskMapper.taskListToDTO(taskList);
    }
}
