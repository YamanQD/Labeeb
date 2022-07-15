import { ITask, ITaskList } from "../../domain/task";
import { TaskDTO, TaskGroupDTO, TaskListDTO } from "../dto";

let dummyId = 0;
const dummyStatuses = ["In Progress", "Done", "Todo"];
export class TaskMapper {
    static taskToDTO(task: ITask): TaskDTO {
        return task;
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
            task.status = dummyStatuses[dummyId % 3] as string;
            // Do we have a list that corresponds to the task's status?
            const suitableTaskGroup = taskGroups.find((group) => group.status == task.status);

            // If so, push the task to the list
            if (suitableTaskGroup) suitableTaskGroup.tasks.push(task);
            // Else create a new list and push this task to it
            else {
                taskGroups.push({
                    status: task.status,
                    id: dummyId,
                    tasks: [task],
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
