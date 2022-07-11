interface TaskGroupInfo {
    projectId: number | undefined;
    groupId: number | undefined;
}

export interface IStore {
    /**
     * The project that the user is currently navigating.
     */
    currentProjectId: number | undefined;
    /**
     * The project group that the user is currently navigating.
     */
    currentGroupId: number | undefined;

    /**
     * Sets which task group the user should be seeing in the tasks view.
     */
    setTaskGroupToView: (taskGroupInfo: TaskGroupInfo) => void;
}
