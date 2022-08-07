import { ITask, ITaskDetails, ITaskList } from "../../domain/task";
import { TaskDetailsDTO, TaskDTO, TaskGroupDTO, TaskListDTO } from "../dto";

const getTasksCountForList = (listTaskGroups: TaskGroupDTO[]) => {
    return listTaskGroups.reduce((previousTasksCount, newGroup) => {
        return previousTasksCount + newGroup.tasks.length;
    }, 0);
};

let dummyId = 0;
export class TaskMapper {
    static taskToDTO(task: ITask): TaskDTO {
        return {
            ...task,
            deadline: new Date(task.deadline),
            status: task.status.title,
        };
    }

    static taskDetailsToDTO(taskDetails: ITaskDetails): TaskDetailsDTO {
        const { id, title, description, priority, deadline, tags } = taskDetails;
        return {
            id,
            title,
            description,
            tags,
            deadline: new Date(deadline),
            priority,
            status: taskDetails.status.title,
            projectId: taskDetails.list.project.id,
            listId: taskDetails.list.id,
        };
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
            tasksCount: getTasksCountForList(taskGroups),
        };
    }
}
