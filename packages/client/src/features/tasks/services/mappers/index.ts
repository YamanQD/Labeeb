import { ITask, ITaskGroup } from "../../domain/task";
import { TaskDTO, TaskGroupDTO, TaskListDTO } from "../dto";

let dummyId = 0;
export class TaskMapper {
    static taskToDTO(task: ITask): TaskDTO {
        return task;
    }

    static taskGroupToDTO(taskGroup: ITaskGroup): TaskGroupDTO {
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
        const taskLists: TaskListDTO[] = [];

        taskGroup.tasks.forEach((task) => {
            // Do we have a list that corresponds to the task's status?
            const suitableTaskList = taskLists.find((list) => list.status == task.status);

            // If so, push the task to the list
            if (suitableTaskList) suitableTaskList.tasks.push(task);

            // Else create a new list and push this task to it
            else {
                taskLists.push({
                    status: task.status,
                    id: dummyId,
                    tasks: [task],
                });
            }

            dummyId++;
        });

        return {
            id: taskGroup.id,
            title: taskGroup.title,
            taskLists,
        };
    }
}
