interface TaskGroupInfo {
    projectId: number | null;
    groupId: number | null;
}

export interface IStore {
    currentProjectId: number | null;
    currentGroupId: number | null;

    /**
     * Sets which task group the user should be seeing in the tasks view.
     */
    setTaskGroupToView: (taskGroupInfo: TaskGroupInfo) => void;
}