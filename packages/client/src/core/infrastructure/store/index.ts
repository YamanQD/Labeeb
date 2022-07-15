import create from "zustand";
import { IStore } from "../interfaces/IStore";

export const useStore = create<IStore>()((set, get) => ({
    currentProjectId: undefined,
    currentListId: undefined,
    isTaskModalOpen: false,
    currentTaskInfo: undefined,

    setTaskListToView({ projectId, listId }) {
        set(() => ({
            currentListId: listId,
            currentProjectId: projectId,
        }));
    },

    toggleTaskModal(value) {
        set(() => ({
            isTaskModalOpen: value ? value : !get().isTaskModalOpen,
        }));
    },

    setCurrentTaskInfo(task) {
        set(() => ({
            currentTaskInfo: task
        }))
    }
}));
