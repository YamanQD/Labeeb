import { ITask, ITaskDetails, ITaskList } from "../../domain/task";
import { TaskDetailsDTO, TaskDTO, TaskGroupDTO, TaskListDTO } from "../dto";

let dummyId = 0;
const dummyStatuses = ["In Progress", "Done", "Todo"];
export class TaskMapper {
    static taskToDTO(task: ITask): TaskDTO {
        task.status = dummyStatuses[dummyId % 3] as string;
        return {
            ...task
        }
    }

    static taskDetailsToDTO(taskDetails: ITaskDetails): TaskDetailsDTO {
        const { id, title, description, status, priority } = taskDetails;
        return {
            id,
            title,
            description,
            status,
            priority,
            projectId: taskDetails.list.project.id,
            listId: taskDetails.list.id,
        }
    }

    static taskListToDTO(taskList: ITaskList): TaskListDTO {
        /**
         * taskGroup:
         *
         * title: "";
         * tasks: []
         *
         * Output:
         *
         * title: "";
         * taskLists: [
         *      status: "",
         *      tasks: []
         * ]
         */
        const taskGroups: TaskGroupDTO[] = [];

        taskList.tasks.forEach((task) => {
            const taskDTO = TaskMapper.taskToDTO(task);

            // Do we have a list that corresponds to the task's status?
            const suitableTaskGroup = taskGroups.find((group) => group.status == taskDTO.status);

            // If so, push the task to the list
            if (suitableTaskGroup) suitableTaskGroup.tasks.push(taskDTO);
            // Else create a new list and push this task to it
            else {
                taskGroups.push({
                    status: taskDTO.status,
                    id: dummyId,
                    tasks: [taskDTO],
                });
            }

            dummyId++;
        });

        return {
            id: taskList.id,
            title: taskList.title,
            taskGroups,
        };
    }
}
