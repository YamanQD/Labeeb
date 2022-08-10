import { UserMapper } from "src/features/users/application/userMapper";
import { ITask, ITaskDetails, ITaskList } from "../types/task";
import { TaskDetailsDTO, TaskDTO, TaskGroupDTO, TaskListDTO } from "../types/task.dto";

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
        };
    }

    static taskDetailsToDTO(taskDetails: ITaskDetails): TaskDetailsDTO {
        const { id, title, description, priority, deadline, tags, status, createdAt, owner } =
            taskDetails;
        return {
            id,
            title,
            description,
            tags,
            status,
            deadline: new Date(deadline),
            priority,

            projectId: taskDetails.list.project.id,
            listId: taskDetails.list.id,
            createdAt: new Date(createdAt),
            owner: UserMapper.userToDTO(owner),
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
            const suitableTaskGroup = taskGroups.find(
                (group) => group.status == taskDTO.status.title
            );

            // If so, push the task to the list
            if (suitableTaskGroup) suitableTaskGroup.tasks.push(taskDTO);
            // Else create a new list and push this task to it
            else {
                taskGroups.push({
                    status: taskDTO.status.title,
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
