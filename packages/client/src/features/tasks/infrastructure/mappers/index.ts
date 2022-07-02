import { ITask, ITaskGroup, ITaskList } from "../../domain/task";
import { TaskDTO, TaskGroupDTO, TaskListDTO } from "../dto";

export class TaskMapper {
    static dtoToTask(dto: TaskDTO): ITask {
        return dto;
    }

    static dtoToTaskList(dto: TaskListDTO): ITaskList {
        return dto;
    }

    static dtoToTaskGroup(dto: TaskGroupDTO): ITaskGroup {
        return dto;
    }
}
