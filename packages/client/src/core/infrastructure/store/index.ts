import create from "zustand";
import { IStore } from "../interfaces/IStore";

export const useStore = create<IStore>()((set) => ({
    currentProjectId: 1,
    currentGroupId: null,

    setTaskGroupToView({ projectId, groupId }) {
        set(() => ({
            currentGroupId: groupId,
            currentProjectId: projectId
        }))
    }
}));