import { TaskDTO } from "src/features/tasks/services";
import { UserDTO } from "src/features/users/services/dto";

interface TaskListInfo {
    projectId: number | null;
    listId: number | null;
}

export interface IStore {
    /**
     * The project that the user is currently navigating.
     */
    currentProjectId: number | null;
    /**
     * The project list that the user is currently navigating.
     */
    currentListId: number | null;

    /**
     * Sets which task list the user should be seeing in the tasks view.
     * This is mainly used in API requests.
     */
    setTaskListToView: (taskListInfo: TaskListInfo) => void;

    /**
     * Whether the modal that's used for adding/editing tasks is open
     */
    isTaskModalOpen: boolean;

    /**
     * The task that the user is currently viewing/editing/deleting.
     */
    currentTaskInfo: TaskDTO | null;

    /**
     * Toggle the visibility of the modal. If `value` is provided,
     * the modal's visibility is set to it. Otherwise, the modal's
     * visibility will be toggled (previous => !previous).
     */
    toggleTaskModal: (value?: boolean) => void;

    /**
     * Sets the info of the task that the user is now seeing.
     * This is used only in the task modal when the user wants to edit/delete
     * a certain task.
     */
    setCurrentTaskInfo: (task: TaskDTO) => void;

    user: UserDTO | null,
    setUserInfo: (info: UserDTO | null) => void;
}
