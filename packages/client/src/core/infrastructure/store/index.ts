import create from "zustand";
import { IStore } from "../interfaces/IStore";

export const useStore = create<IStore>()((set) => ({
    currentProjectId: undefined,
    currentGroupId: undefined,

    setTaskGroupToView({ projectId, groupId }) {
        set(() => ({
            currentGroupId: groupId,
            currentProjectId: projectId
        }))
    }
}));