import { ITask, ITaskGroup, ITaskList } from "../../domain/task";
import { TaskDTO, TaskGroupDTO, TaskListDTO } from "../dto";

export class TaskMapper {
    static taskToDTO(task: ITask): TaskDTO {
        return task;
    }

    static taskListToDTO(taskList: ITaskList): TaskListDTO {
        return taskList;
    }

    static taskGroupToDTO(taskGroup: ITaskGroup): TaskGroupDTO {
        return taskGroup;
    }
}
