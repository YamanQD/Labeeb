import create from "zustand";
import { IStore } from "../interfaces/IStore";

export const useStore = create<IStore>()((set) => ({
    currentProjectId: undefined,
    currentListId: undefined,

    setTaskListToView({ projectId, listId }) {
        set(() => ({
            currentListId: listId,
            currentProjectId: projectId,
        }));
    },
}));
