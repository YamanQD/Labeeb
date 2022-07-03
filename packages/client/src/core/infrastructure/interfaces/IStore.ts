interface TaskGroupInfo {
    projectId: number | undefined;
    groupId: number | undefined;
}

export interface IStore {
    currentProjectId: number | undefined;
    currentGroupId: number | undefined;

    /**
     * Sets which task group the user should be seeing in the tasks view.
     */
    setTaskGroupToView: (taskGroupInfo: TaskGroupInfo) => void;
}