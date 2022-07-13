interface TaskListInfo {
    projectId: number | undefined;
    listId: number | undefined;
}

export interface IStore {
    /**
     * The project that the user is currently navigating.
     */
    currentProjectId: number | undefined;
    /**
     * The project list that the user is currently navigating.
     */
    currentListId: number | undefined;

    /**
     * Sets which task list the user should be seeing in the tasks view.
     */
    setTaskListToView: (taskListInfo: TaskListInfo) => void;
}
